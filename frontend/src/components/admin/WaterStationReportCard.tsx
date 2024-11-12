"use client";

import { useState } from "react";
import BaseCardWithButton from "../BaseCardWithButton";
import { ButtonProps } from "../Button";
import WaterStationInfoSection, {
  WaterStationDetailProp,
} from "../WaterStationInfoSection";
import defaultPic from "../../../public/waterStationPic.svg";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WaterStationInfoModal from "../WaterStationInfoModal";
import { WaterStationService } from "@/app/water-station/services/WaterStaionService";
import { useSession } from "next-auth/react";
import { adminService } from "@/api/admin-service";

export default function WaterStationReportCard(props: {
  waterStation: WaterStationDetailProp;
}) {
  const [isDetailOpened, setIsDetailOpened] = useState(false);

  const { data: session } = useSession();

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
      color: "green",
      label: "รับรอง",
      onClick: () => {
        handleStatusClick(props.waterStation._id, props.waterStation.owner, true);
      },
      isBold: true,
    },
    {
      color: "red",
      label: "ไม่รับรอง",
      onClick: () => {
        handleStatusClick(props.waterStation._id, props.waterStation.owner, false);
      },
      isBold: true,
    },
  ];

  const handleStatusClick = async (id: string | undefined, ownerId: string | undefined, status: boolean) => {
    const owner = await adminService.getOwnerEmailAndName(session?.user.token as string, ownerId || "");
    const ownerName = owner.name;
    const ownerEmail = owner.email;

    await WaterStationService.updateWaterStationApprovalStatus(
      session?.user.token as string,
      id || "",
      status,
      ownerEmail || "",
      ownerName || "user",
    );
    window.location.reload();
  };

  return (
    <>
      <BaseCardWithButton buttonList={buttonList}>
        <div className="relative flex h-full flex-row">
          <div className="absolute left-2 top-2 z-[80] flex flex-row gap-2 rounded-md bg-white p-2 text-zinc-500">
            <AccessTimeIcon />
            รอการรับรอง
          </div>
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
    </>
  );
}
