import { WaterStationCreateSchema } from '../types/WaterStationType';

export const WaterStationService = {
    createWaterStation: async (input: WaterStationCreateSchema) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    getPendingWaterStations: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/?approvalStatus=pending`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    getMyWaterStations: async (userId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/?owner=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    deleteWaterStation: async (id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    updateWaterStationApprovalStatus: async (id: string, isApproved: boolean) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}/update-approval-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isApproved: isApproved }),
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    getWaterStationById: async (id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    updateWaterStation: async (id: string, input: WaterStationCreateSchema) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
    },
}