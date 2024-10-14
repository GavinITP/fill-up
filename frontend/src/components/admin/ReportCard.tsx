"use client";

import { useState } from "react";
import BaseCardWithButton from "../BaseCardWithButton";
import Button, { ButtonProps } from "../Button";
import BaseModal from "../BaseModal";
import BaseModalWithInput from "../BaseModalWithInput";

export default function ReportCard(props: {
  waterStationName: string;
  date: string;
  details: string;
}) {
  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [isReportOpened, setIsReportOpened] = useState(false);
  const [reportComment, setReportComment] = useState("");

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
        alert("no problem found");
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
              ข้อร้องเรียนตู้กดน้ำ {props.waterStationName}
            </h4>
            <div className="text-base font-normal text-zinc-500">
              วันที่ร้องเรียน: {props.date}
            </div>
          </div>

          <span className="line-clamp-3 text-base font-normal text-zinc-500">
            {props.details}
          </span>
        </div>
      </BaseCardWithButton>
      <BaseModalWithInput
        color="blue"
        title={"ข้อร้องเรียน"}
        instruction={`ปัญหาที่พบเกี่ยวกับตู้กดน้ำ ${props.waterStationName}`}
        textInput={props.details}
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
        instruction={`ระบุปัญหาที่ตรวจพบเกี่ยวกับตู้กดน้ำ ${props.waterStationName}`}
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
                alert(reportComment);
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
