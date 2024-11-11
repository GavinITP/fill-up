"use client";

import { WaterStationService } from "@/app/water-station/services/WaterStaionService";
import WaterStationReportCard from "@/components/admin/WaterStationReportCard";
import { WaterStationDetailProp } from "@/components/WaterStationInfoSection";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [waterstationList, setWaterStationList] = useState<
    WaterStationDetailProp[]
  >([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPendingWaterStations = async () => {
      const response = await WaterStationService.getPendingWaterStations(
        session?.user.token as string,
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
    fetchPendingWaterStations();
  }, [session?.user.token]);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-3xl font-bold text-lightblue-900">
        รับรองสถานีเติมน้ำ
      </h1>
      <div className="grid w-full grid-cols-1 gap-12">
        {waterstationList.map((waterStation, index) => (
          <WaterStationReportCard key={index} waterStation={waterStation} />
        ))}
      </div>
    </div>
  );
}
