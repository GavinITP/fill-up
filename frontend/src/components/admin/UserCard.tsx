"use client";

import { useState } from "react";
import Image from "next/image";
import BaseCardWithButton from "../BaseCardWithButton";
import Button, { ButtonProps } from "../Button";
import BaseModal from "../BaseModal";
import mockIdCard from "../../../public/mockIDcard.png";

export default function UserCard(props: {
  name: string;
  email: string;
  telNo: string;
  idCard: string;
}) {
  const [isOpened, setIsOpened] = useState(false);

  const buttonList: ButtonProps[] = [
    {
      color: "blue-line",
      label: "ดูบัตรประชาชน",
      onClick: () => {
        setIsOpened(true);
      },
      isBold: true,
    },
    {
      color: "green",
      label: "รับรอง",
      onClick: () => {
        alert("approve");
      },
      isBold: true,
    },
    {
      color: "red",
      label: "ไม่รับรอง",
      onClick: () => {
        alert("not approve");
      },
      isBold: true,
    },
  ];

  const detail = (key: string, value: string) => {
    return (
      <div className="flex flex-row gap-2 text-lg text-zinc-400">
        <span className="font-bold">{key}:</span>
        <span className="font-normal">{value}</span>
      </div>
    );
  };

  return (
    <>
      <BaseCardWithButton buttonList={buttonList}>
        <div className="flex flex-col items-start justify-start gap-2 px-4 py-6">
          <h4 className="text-xl font-bold">{props.name}</h4>
          <div>
            {detail("อีเมลล์", props.email)}
            {detail("เบอร์โทรศัพท์", props.telNo)}
          </div>
        </div>
      </BaseCardWithButton>
      <BaseModal
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <div className="flex h-fit w-[40vw] flex-col items-center justify-between gap-4 p-6">
          <Image
            src={mockIdCard}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt={`id card of ${props.name}`}
          />
          <Button
            color="blue"
            label="ปิด"
            onClick={() => {
              setIsOpened(false);
            }}
            isBold={true}
          />
        </div>
      </BaseModal>
    </>
  );
}
