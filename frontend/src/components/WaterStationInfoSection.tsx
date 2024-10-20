"use client";

import Tag from "./Tag";
import TemperatureTag from "./TemperatureTag";

export interface WaterStationDetailProp {
  id?: string;
  name: string;
  address: string;
  permission: string[];
  isFree: boolean;
  waterTemperature: string[];
  maintenanceDetails: string;
  date: string;
  approvalStatus?: string;
}

export default function WaterStationInfoSection({
  name,
  address,
  permission,
  isFree,
  waterTemperature,
}: WaterStationDetailProp) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 px-4 py-6">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-lightblue-500 text-base font-normal">
          {isFree ? "ฟรี" : "มีค่าใช้จ่าย"}
        </span>
        <div className="flex flex-row gap-2">
          {waterTemperature.map((temp, index) => {
            return <TemperatureTag key={index} label={temp} />;
          })}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-black">{name}</h4>
        <span className="line-clamp-1 text-base font-normal text-zinc-500">
          {address}
        </span>
      </div>
      <div className="flex flex-row gap-4">
        <h2 className="text-base font-normal text-zinc-500">
          ผู้ที่ได้รับอนุญาต:
        </h2>
        <div className="flex flex-row gap-2">
          {permission.map((permission, index) => {
            return <Tag key={index} color="gray" label={permission} />;
          })}
        </div>
      </div>
    </div>
  );
}
