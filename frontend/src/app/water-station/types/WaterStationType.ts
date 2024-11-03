export interface WaterStationCreateSchema {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    waterTemperature: string[];
    isFree: boolean;
    permission: string[];
    maintenanceDetails: string;
    owner: string;
}