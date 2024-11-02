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
    }
}