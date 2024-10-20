"use client";

import BaseModal from "./BaseModal";
import Button from "./Button";
import Tag from "./Tag";
import TemperatureTag from "./TemperatureTag";
import { WaterStationDetailProp } from "./WaterStationInfoSection";

export default function WaterStationInfoModal(props: {
  waterStationInfo: WaterStationDetailProp;
  isOpened: boolean;
  onClose: () => void;
}) {
  const info = (
    key: string,
    value: JSX.Element | string,
    direction: "col" | "row",
  ) => {
    return (
      <div className={`flex flex-${direction} w-full gap-2`}>
        <h5 className="text-nowrap font-bold">{key}: </h5>
        <span className="w-full font-normal">{value}</span>
      </div>
    );
  };

  return (
    <BaseModal isOpened={props.isOpened} onClose={props.onClose}>
      <div className="flex w-[60vw] flex-col items-start justify-start gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h4 className="text-lightblue-900 text-3xl font-bold">
            {props.waterStationInfo.name}
          </h4>
          <div className="text-base font-normal text-zinc-500">
            ปรับปรุงล่าสุด: {props.waterStationInfo.date}
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 text-base text-black">
          {info("ที่อยู่", props.waterStationInfo.address, "col")}
          <div className="flex h-full flex-col gap-4">
            {info(
              "อุณหภูมิของน้ำ",
              <div className="flex flex-row gap-2">
                {props.waterStationInfo.waterTemperature.map((temp, index) => {
                  return <TemperatureTag key={index} label={temp} />;
                })}
              </div>,
              "row",
            )}
            {info(
              "ราคา",
              props.waterStationInfo.isFree ? "ฟรี" : "มีค่าใช้จ่าย",
              "row",
            )}
          </div>
        </div>
        {info(
          "ผู้ที่ได้รับอนุญาต",
          <div className="flex flex-row gap-2">
            {props.waterStationInfo.permission.map((permission, index) => {
              return <Tag key={index} color="gray" label={permission} />;
            })}
          </div>,
          "row",
        )}
        {info(
          "รายละเอียดการบำรุงรักษา",
          props.waterStationInfo.maintenanceDetails,
          "col",
        )}

        <div className="mt-4 flex w-full flex-row justify-end">
          <div className="w-2/12">
            <Button
              color="blue"
              label="ปิด"
              onClick={props.onClose}
              isBold={true}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
