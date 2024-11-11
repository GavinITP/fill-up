"use client";

import WaterStationForm from "@/components/WaterStationForm";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link } from "@mui/material";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-8 px-16 py-16">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="w-full font-sans"
      >
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        ,
        <Link underline="hover" color="text.primary" aria-current="page">
          ลงทะเบียนสถานีเติมน้ำ
        </Link>
      </Breadcrumbs>
      <h1 className="text-3xl font-bold text-lightblue-900">
        ลงทะเบียนสถานีเติมน้ำ
      </h1>
      <WaterStationForm router={router} />
    </div>
  );
}
