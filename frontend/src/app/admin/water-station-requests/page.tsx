import WaterStationReportCard from "@/components/admin/WaterStationReportCard";
import { WaterStationDetailProp } from "@/components/WaterStationInfoSection";

export default function Page() {
  const waterstationList: WaterStationDetailProp[] = [
    {
      name: "Roseheart's water station",
      address: "121/1 Heartslabyul Dorm, Night Raven College",
      permissionList: ["Heartslabyul's student", "yuu"],
      waterTemperature: ["ร้อน", "เย็น", "อุณหภูมิห้อง"],
      maintenanceDetail: "details is here",
      isFree: true,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-lightblue-900 text-3xl font-bold">
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
