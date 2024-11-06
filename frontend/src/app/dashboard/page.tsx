"use client";

import WaterStationCard from "@/components/WaterStationCard";
import { WaterStationDetailProp } from "@/components/WaterStationInfoSection";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { WaterStationService } from "../water-station/services/WaterStaionService";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [waterstationList, setWaterStationList] = useState<
    WaterStationDetailProp[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMyWaterStations = async () => {
      if (!session) return;
      const response = await WaterStationService.getMyWaterStations(
        session.user.token,
        session.user._id,
      );
      if (response == null) {
        return;
      }
      if (response.isSuccess) {
        setWaterStationList(response.message);
      } else {
        console.error(response.message);
      }
    };
    fetchMyWaterStations();
  }, []);

  const handleRegisterClick = () => {
    router.push("/water-station/register");
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-12 px-36 py-16">
      <h1 className="text-3xl font-bold text-lightblue-900">Dashboard</h1>
      <div className="grid w-full grid-cols-1 gap-12">
        <button
          className="flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-newgray-400 bg-white"
          onClick={handleRegisterClick}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <AddIcon className="h-16 w-16" />
            <h1 className="text-2xl font-semibold">ลงทะเบียนสถานีเติมน้ำ</h1>
          </div>
        </button>
        {waterstationList.map((waterStation, index) => (
          <WaterStationCard
            key={index}
            waterStation={waterStation}
            router={router}
          />
        ))}
      </div>
    </div>
  );
}
