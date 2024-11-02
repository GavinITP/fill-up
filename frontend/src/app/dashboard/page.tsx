"use client";

import WaterStationCard from "@/components/WaterStationCard";
import { WaterStationDetailProp } from "@/components/WaterStationInfoSection";
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { WaterStationService } from "../water-station/services/WaterStaionService";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    const [waterstationList, setWaterStationList] = useState<WaterStationDetailProp[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchMyWaterStations = async () => {
            if (!session) return;
            const response = await WaterStationService.getMyWaterStations(session.user._id)
            if (response == null) {
                return
            }
            if (response.isSuccess) {
                setWaterStationList(response.message)
            } else {
                console.error(response.message)
            }
        }
        fetchMyWaterStations()
    }, [])

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
