import dotenv from 'dotenv';
import { WaterStationCreateSchema } from '../types/WaterStationType';

dotenv.config();

export const WaterStationService = {
    createWaterStation: async (input: WaterStationCreateSchema) => {
        const response = await fetch("http://localhost:5050/api/v1/water-stations", {
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
        const response = await fetch("http://localhost:5050/api/v1/water-stations?approvalStatus=pending", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return { isSuccess: data.success, message: data.data }
    }
}