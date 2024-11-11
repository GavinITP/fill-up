import { WaterStationCreateSchema } from "../types/WaterStationType";

export const WaterStationService = {
  createWaterStation: async (
    token: string,
    input: WaterStationCreateSchema,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },

  getPendingWaterStations: async (token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/?approvalStatus=pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },
  getMyWaterStations: async (token: string, userId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/?owner=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },

  deleteWaterStation: async (token: string, id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },

  updateWaterStationApprovalStatus: async (
    token: string,
    id: string,
    isApproved: boolean,
    email: string,
    ownerName: string,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}/update-approval-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isApproved: isApproved,
          email: email,
          ownerName: ownerName,
        }),
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },

  getWaterStationById: async (token: string, id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },

  updateWaterStation: async (
    token: string,
    id: string,
    input: WaterStationCreateSchema,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      },
    );
    const data = await response.json();
    return { isSuccess: data.success, message: data.data };
  },
};
