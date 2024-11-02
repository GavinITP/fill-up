import { WaterStationCreateSchema } from '../types/WaterStationType';

export const WaterStationService = {
    createWaterStation: async (input: WaterStationCreateSchema) => {
        const response = await fetch("http://localhost:5050/", {
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
        const response = await fetch("http://localhost:5050/?approvalStatus=pending", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    getMyWaterStations: async (userId: string) => {
        const response = await fetch(`http://localhost:5050/?owner=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    deleteWaterStation: async (id: string) => {
        const response = await fetch(`http://localhost:5050/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    },

    updateWaterStationApprovalStatus: async (id: string, isApproved: boolean) => {
        const response = await fetch(`http://localhost:5050/${id}/update-approval-status`, {
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
        const response = await fetch(`http://localhost:5050/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    }
}