"use client";

import WaterStationCard from "@/components/WaterStationCard";
import { WaterStationDetailProp } from "@/components/WaterStationInfoSection";
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';

export default function Page() {
    const waterstationList: WaterStationDetailProp[] = [
        {
            id: "1",
            name: "Roseheart's water station",
            address: "121/1 Heartslabyul Dorm, Night Raven College",
            permission: ["Heartslabyul's student", "yuu"],
            waterTemperature: ["ร้อน", "เย็น", "อุณหภูมิห้อง"],
            maintenanceDetails: "details is here",
            isFree: true,
            date: "2020-2-3",
            approvalStatus: "pending",
        },
        {
            id: "2",
            name: "Roseheart's water station",
            address: "121/1 Heartslabyul Dorm, Night Raven College",
            permission: ["Heartslabyul's student", "yuu"],
            waterTemperature: ["ร้อน", "เย็น", "อุณหภูมิห้อง"],
            maintenanceDetails: "details is here",
            isFree: true,
            date: "2020-2-3",
            approvalStatus: "approved",
        },
        {
            id: "3",
            name: "Roseheart's water station",
            address: "121/1 Heartslabyul Dorm, Night Raven College",
            permission: ["Heartslabyul's student", "yuu"],
            waterTemperature: ["ร้อน", "เย็น", "อุณหภูมิห้อง"],
            maintenanceDetails: "details is here",
            isFree: true,
            date: "2020-2-3",
            approvalStatus: "rejected",
        },
    ];
    const router = useRouter();

    const handleRegisterClick = () => {
        router.push('/water-station/register');
    }

    return (
        <div className="flex w-full flex-col items-center justify-start gap-12 px-36 py-16">
            <h1 className="text-lightblue-900 text-3xl font-bold">
                Dashboard
            </h1>
            <div className="grid w-full grid-cols-1 gap-12">
                <button className="border-newgray-400 h-52 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border-dashed bg-white border-2" onClick={handleRegisterClick}>
                    <div className="flex flex-col text-gray-500 items-center gap-2">
                        <AddIcon className="w-16 h-16" />
                        <h1 className="font-semibold text-2xl">ลงทะเบียนสถานีเติมน้ำ</h1>
                    </div>
                </button>
                {waterstationList.map((waterStation, index) => (
                    <WaterStationCard key={index} waterStation={waterStation} router={router} />
                ))}
            </div>
        </div>
    );
}
