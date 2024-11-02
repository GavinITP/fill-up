import { Request, Response, NextFunction } from "express";
import WaterStation from "../models/waterStation.model";
import { sendMessageToQueue } from '../../../mail-service/src/PublisherService';

const getWaterStations = async (req: Request, res: Response) => {
  let query;

  const {
    name,
    latitude,
    longitude,
    address,
    permission,
    waterTemperature,
    isFree,
    approvalStatus,
  } = req.query;

  const filter: any = {};

  if (name) filter.name = { $regex: name, $options: "i" };

  if (latitude && longitude) {
    const latCenter = Number(latitude);
    const longCenter = Number(longitude);
    filter.location = {
      $geoWithin: {
        $centerSphere: [
          [longCenter, latCenter], // [longitude, latitude]
          2 / 6378.1, // radius in radians (2 km)
        ],
      },
    };
  }

  if (address) filter.address = { $regex: address, $options: "i" };

  if (permission)
    filter.permission = { $in: (permission as string).split(",") };

  if (waterTemperature)
    filter.waterTemperature = { $in: (waterTemperature as string).split(",") };

  if (isFree) filter.isFree = isFree === "true";

  if (approvalStatus) filter.approvalStatus = approvalStatus;

  query = WaterStation.find(filter);

  if (req.query.select) {
    const fields = (req.query.select as string).split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await WaterStation.countDocuments();

    //Pagination result
    const pagination = { next: {}, prev: {} };

    if (limit !== -1) {
      query = query.skip(startIndex).limit(limit);

      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        };
      }
    }

    const waterStations = await query;

    res.status(200).json({
      success: true,
      count: waterStations.length,
      pagination,
      data: waterStations,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const getWaterStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const waterStation = await WaterStation.findById(req.params.id);
    if (!waterStation) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: waterStation });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const createWaterStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.location = {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    };
    const createdWaterStation = await WaterStation.create(req.body);
    res.status(201).json({ success: true, data: createdWaterStation });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const updateWaterStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.updatedAt = new Date();
    const waterStation = await WaterStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!waterStation) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: waterStation });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

const updateApprovalStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filter = { _id: req.params.id };
        const changedStatus = {
            $set: { approvalStatus: req.body.isApproved ? "approved" : "rejected" },
        };

        req.body.updatedAt = new Date();
        const result = await WaterStation.updateOne(filter, changedStatus);

        if (result.matchedCount === 0) {
            return res.status(400).json({ success: false });
        }

        // send email to the owner
        const waterStation = await WaterStation.findById(req.params.id);
        if (waterStation) {
            const message = JSON.stringify({
                waterStationName: waterStation.name,
                waterStationStatus: req.body.isApproved ? "approved" : "rejected",
                name: "Soft-Arch User",
                email: "6432142321@student.chula.ac.th"
            });

            sendMessageToQueue('water-station-approval', message);
        }

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = { _id: req.params.id };
    const note = {
      $set: { note: req.body.note },
    };

    req.body.updatedAt = new Date();
    const result = await WaterStation.updateOne(filter, note);

    if (result.matchedCount === 0) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

const deleteWaterStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const waterStation = await WaterStation.findById(req.params.id);

    if (!waterStation) return res.status(404).json({ success: false });

    await waterStation.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const searchWaterStations = async (req: Request, res: Response) => {
  let query;

  const {
    name,
    latitude,
    longitude,
    address,
    permission,
    waterTemperature,
    isFree,
    approvalStatus,
    minTemperature,
    maxTemperature,
  } = req.query;

  const filter: any = {};

  if (name && (name as string).length > 0) {
    filter.name = { $regex: name, $options: "i" };
  }

  // Geo-location search (within a 2 km radius)
  if (latitude && longitude) {
    const latCenter = Number(latitude);
    const longCenter = Number(longitude);
    filter.location = {
      $geoWithin: {
        $centerSphere: [
          [longCenter, latCenter], // [longitude, latitude]
          2 / 6378.1, // radius in radians (2 km)
        ],
      },
    };
  }

  // Address search (case-insensitive)
  if (address) filter.address = { $regex: address, $options: "i" };

  // Permission filtering
  if (permission)
    filter.permission = { $in: (permission as string).split(",") };

  // Water temperature filtering (optional range filter)
  if (waterTemperature) {
    filter.waterTemperature = { $in: (waterTemperature as string).split(",") };
  } else if (minTemperature || maxTemperature) {
    filter.waterTemperature = {};
    if (minTemperature) filter.waterTemperature.$gte = Number(minTemperature);
    if (maxTemperature) filter.waterTemperature.$lte = Number(maxTemperature);
  }

  // Free station filtering
  if (isFree) filter.isFree = isFree === "true";

  // Approval status filtering
  if (approvalStatus) filter.approvalStatus = approvalStatus;

  query = WaterStation.find(filter);

  // Field selection
  if (req.query.select) {
    const fields = (req.query.select as string).split(",").join(" ");
    query = query.select(fields);
  }

  // Sort results
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await WaterStation.countDocuments();

    // Pagination result
    const pagination: any = {};
    if (limit !== -1) {
      query = query.skip(startIndex).limit(limit);

      if (endIndex < total) {
        pagination.next = { page: page + 1, limit };
      }

      if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit };
      }
    }

    const waterStations = await query;

    res.status(200).json({
      success: true,
      count: waterStations.length,
      pagination,
      data: waterStations,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

export const waterStationController = {
  getWaterStations,
  getWaterStation,
  createWaterStation,
  updateWaterStation,
  updateApprovalStatus,
  updateNote,
  deleteWaterStation,
  searchWaterStations,
};
