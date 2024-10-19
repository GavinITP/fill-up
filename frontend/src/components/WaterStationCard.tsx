"use client";

import { useState } from "react";
import BaseCardWithButton from "./BaseCardWithButton";
import Button, { ButtonProps } from "./Button";
import WaterStationInfoSection, {
  WaterStationDetailProp,
} from "./WaterStationInfoSection";
import defaultPic from "../../public/waterStationPic.svg";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import WaterStationInfoModal from "./WaterStationInfoModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import BaseModal from "./BaseModal";
import { red } from "@mui/material/colors";

export default function WaterStationCard(props: {
  waterStation: WaterStationDetailProp;
  router: AppRouterInstance;
}) {

  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);

  const buttonList: ButtonProps[] = [
    {
      color: "blue-line",
      label: "ดูรายละเอียด",
      onClick: () => {
        setIsDetailOpened(true);
      },
      isBold: true,
    },
    {
      color: "yellow",
      label: "แก้ไข",
      onClick: () => {
        if (props.waterStation.id) {
          handleEditClick(props.waterStation.id);
        }
      },
      isBold: true,
    },
    {
      color: "red",
      label: "ลบ",
      onClick: () => {
        setIsDeleteOpened(true);
      },
      isBold: true,
    },
  ];

  const handleEditClick = (id: string) => {
    props.router.push(`/water-station/${id}/edit`);
  }

  const getApprovalStatus = () => {
    if (props.waterStation.approvalStatus === "pending") {
      return (
        <div className="absolute left-2 top-2 z-[80] flex flex-row gap-2 rounded-md bg-white p-2 text-zinc-500">
          <AccessTimeIcon />
          รอการรับรอง
        </div>
      );
    }
    if (props.waterStation.approvalStatus === "approved") {
      return (
        <div className="absolute left-2 top-2 z-[80] flex flex-row gap-2 rounded-md bg-white p-2 text-lightgreen-500">
          <CheckCircleIcon />
          รับรองแล้ว
        </div>
      );
    }
    if (props.waterStation.approvalStatus === "rejected") {
      return (
        <div className="absolute left-2 top-2 z-[80] flex flex-row gap-2 rounded-md bg-white p-2 text-red-500">
          <CancelIcon />
          ไม่ผ่านการรับรอง
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <BaseCardWithButton buttonList={buttonList}>
        <div className="relative flex h-full flex-row">
          {getApprovalStatus()}
          <Image
            src={defaultPic}
            alt="water station"
            style={{ width: "auto", height: "100%" }}
          />
          <div className="w-4/5">
            <WaterStationInfoSection {...props.waterStation} />
          </div>
        </div>
      </BaseCardWithButton>
      <WaterStationInfoModal
        waterStationInfo={props.waterStation}
        isOpened={isDetailOpened}
        onClose={() => setIsDetailOpened(false)}
      />
      <BaseModal
        isOpened={isDeleteOpened}
        onClose={() => {
          setIsDeleteOpened(false);
        }}
      >
        <div className="flex h-fit w-[40vw] flex-col items-start justify-between gap-6 p-6">
          <div className="flex justify-start">
            <h2
              className="text-3xl font-bold text-newred-500 pt-1"
            >ลบสถานีเติมน้ำ
            </h2>
            <DeleteIcon className="text-4xl" style={{ color: red[500] }} />
          </div>
          <div className="flex w-full flex-col gap-1">
            <span className="text-base font-normal text-zinc-500">
              คุณต้องการจะลบสถานีเติมน้ำ {props.waterStation.name} ใช่หรือไม่<br />
              การกระทำนี้ไม่สามารถย้อนกลับได้
            </span>
          </div>
          <div className="flex w-full justify-end gap-4">
            <div className="w-1/5">
              <Button
                color="gray"
                label="ยกเลิก"
                onClick={() => {
                  setIsDeleteOpened(false);
                }}
                isBold={true}
              />
            </div>
            <div className="w-1/5">
              <Button
                color="red"
                label="ลบ"
                onClick={() => {
                  setIsDeleteOpened(false);
                  alert("delete");
                }}
                isBold={true}
              />
            </div>
          </div>
        </div>
      </BaseModal >
    </>
  );
}
