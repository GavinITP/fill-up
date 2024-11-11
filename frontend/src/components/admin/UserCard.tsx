"use client";

import { useState } from "react";
import Image from "next/image";
import BaseCardWithButton from "../BaseCardWithButton";
import Button, { ButtonProps } from "../Button";
import BaseModal from "../BaseModal";
import mockIdCard from "../../../public/mockIDcard.png";
import { adminService } from "@/api/admin";
import { useSession } from "next-auth/react";

export interface UserCardProps {
  owner_id: string;
  name: string;
  email: string;
  tel: string;
  idCard: string;
}

export default function UserCard({
  owner_id,
  name,
  email,
  tel,
  idCard
}: UserCardProps) {
  const { data: session } = useSession();
  const token = session?.user.token;
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
      onClick: async () => {
        handleVerificationClick(token, owner_id, true);
      },
      isBold: true,
    },
    {
      color: "red",
      label: "ไม่รับรอง",
      onClick: async () => {
        handleVerificationClick(token, owner_id, false);
      },
      isBold: true,
    },
  ];

  const handleVerificationClick = async (token: string | undefined, owner_id: string, status: boolean) => {
    if (!token) {
      return;
    }
    await adminService.sendOwnerVerification(token, owner_id, status);
    window.location.reload();
  }

  const detail = (key: string, value: string) => {
    return (
      <div className="flex flex-row gap-2 text-lg text-zinc-500">
        <span className="font-bold">{key}:</span>
        <span className="font-normal">{value}</span>
      </div>
    );
  };

  return (
    <>
      <BaseCardWithButton buttonList={buttonList}>
        <div className="flex flex-col items-start justify-start gap-2 px-4 py-6">
          <h4 className="text-xl font-bold">{name}</h4>
          <div>
            {detail("อีเมลล์", email)}
            {detail("เบอร์โทรศัพท์", tel)}
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
            alt={`id card of ${name}`}
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
