"use client";

import { useState } from "react";
import BaseCardWithButton from "../BaseCardWithButton";
import Button, { ButtonProps } from "../Button";
import BaseModal from "../BaseModal";

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
      <BaseModal
        isOpened={isDetailOpened}
        onClose={() => {
          setIsDetailOpened(false);
        }}
      >
        <div className="flex h-fit w-[40vw] flex-col items-start justify-between gap-4 p-6">
          <h2 className="text-lightblue-900 text-3xl font-bold">
            ข้อร้องเรียน
          </h2>
          <div className="flex w-full flex-col gap-1">
            <span className="text-base font-normal text-zinc-500">
              ปัญหาที่พบเกี่ยวกับตู้กดน้ำ {props.waterStationName}
            </span>
            <textarea
              id="message"
              rows={6}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-black"
              disabled
            >
              {props.details}
            </textarea>
          </div>
          <div className="mt-4 flex w-full flex-row justify-end">
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
          </div>
        </div>
      </BaseModal>
      <BaseModal
        isOpened={isReportOpened}
        onClose={() => {
          setIsReportOpened(false);
        }}
      >
        <div className="flex h-fit w-[40vw] flex-col items-start justify-between gap-4 p-6">
          <h2 className="text-newred-500 text-3xl font-bold">
            บันทึกการตรวจสอบ
          </h2>
          <div className="flex w-full flex-col gap-1">
            <span className="text-base font-normal text-zinc-500">
              ระบุปัญหาที่ตรวจพบเกี่ยวกับตู้กดน้ำ {props.waterStationName}
            </span>
            <textarea
              id="message"
              rows={6}
              className="focus:outline-newgray-400 w-full rounded-lg border border-gray-300 p-2.5 text-base text-black"
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
            />
          </div>
          <div className="mt-4 flex w-full flex-row justify-end gap-2">
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
          </div>
        </div>
      </BaseModal>
    </>
  );
}
