"use client";

import { useState } from "react";
import BaseCardWithButton from "../BaseCardWithButton";
import Button, { ButtonProps } from "../Button";
import BaseModalWithInput from "../BaseModalWithInput";
import { adminService } from "@/api/admin-service";
import { useSession } from "next-auth/react";

export interface ReportCardProps {
  id: string;
  stationId: string;
  stationName: string;
  name: string;
  description: string;
  createdAt: string;
  completed: string;
}

export default function ReportCard({
  id,
  stationId,
  stationName,
  name,
  createdAt,
  description
}: ReportCardProps) {
  const { data: session } = useSession();
  const token = session?.user.token;

  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [isReportOpened, setIsReportOpened] = useState(false);
  const [reportComment, setReportComment] = useState("");

  const markReport = async (reportId: string, completed: boolean) => {
    try {
      await adminService.markReport(token, reportId, completed);
      window.location.reload();
    } catch (error) {
      console.error("Error marking reports:", error);
    }
  }

  const sendAdminNote = async (stationId: string, note: string) => {
    try {
      await adminService.sendAdminNote(token, stationId, note);
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  }

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
      label: "ไม่พบปัญหา",
      onClick: () => {
        markReport(id, true);
      },
      isBold: true,
    },
    {
      color: "red",
      label: "พบปัญหา",
      onClick: () => {
        setIsReportOpened(true);
      },
      isBold: true,
    },
  ];

  return (
    <>
      <BaseCardWithButton buttonList={buttonList}>
        <div className="flex w-4/5 flex-col items-start justify-start gap-6 px-4 py-6">
          <div>
            <h4 className="text-xl font-bold text-black">
              ข้อร้องเรียนตู้กดน้ำ {stationName} : {name}
            </h4>
            <div className="text-base font-normal text-zinc-500">
              วันที่ร้องเรียน: {createdAt}
            </div>
          </div>

          <span className="line-clamp-3 text-base font-normal text-zinc-500">
            {description}
          </span>
        </div>
      </BaseCardWithButton>
      <BaseModalWithInput
        color="blue"
        title={"ข้อร้องเรียน"}
        instruction={`ปัญหาที่พบเกี่ยวกับตู้กดน้ำ ${stationName}`}
        textInput={description}
        disabled={true}
        isOpened={isDetailOpened}
        onClose={() => {
          setIsDetailOpened(false);
        }}
      >
        <div className="w-2/12">
          <Button
            color="blue"
            label="ปิด"
            onClick={() => {
              setIsDetailOpened(false);
            }}
            isBold={true}
          />
        </div>
      </BaseModalWithInput>
      <BaseModalWithInput
        color="red"
        title={"บันทึกการตรวจสอบ"}
        instruction={`ระบุปัญหาที่ตรวจพบเกี่ยวกับตู้กดน้ำ ${stationName}`}
        textInput={reportComment}
        disabled={false}
        isOpened={isReportOpened}
        onClose={() => {
          setIsReportOpened(false);
        }}
        onChange={(e) => setReportComment(e.target.value)}
      >
        <>
          <div className="w-1/6">
            <Button
              color="gray"
              label="ยกเลิก"
              onClick={() => {
                setIsReportOpened(false);
                setReportComment("");
              }}
              isBold={true}
            />
          </div>
          <div className="w-3/12">
            <Button
              color="red"
              label="จัดการปัญหา"
              onClick={() => {
                setIsReportOpened(false);
                markReport(id, true);
                sendAdminNote(stationId, reportComment);
                setReportComment("");
              }}
              isBold={true}
            />
          </div>
        </>
      </BaseModalWithInput>
    </>
  );
}
