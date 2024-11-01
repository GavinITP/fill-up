import express from "express";
import { waterStationController } from "../controllers/waterStation.controller";

const router = express.Router({ mergeParams: true });

// Search water stations
router.route("/search").get(waterStationController.searchWaterStations);

router
  .route("/")
  .get(waterStationController.getWaterStations)
  .post(waterStationController.createWaterStation);

router
  .route("/:id")
  .get(waterStationController.getWaterStation)
  .put(waterStationController.updateWaterStation)
  .delete(waterStationController.deleteWaterStation);

router
  .route("/:id/update-approval-status")
  .put(waterStationController.updateApprovalStatus);
router.route("/:id/update-note").put(waterStationController.updateNote);

export default router;
