"use client";

import WaterStationForm from "@/components/WaterStationForm";
import { useRouter, useParams } from "next/navigation";
import { Breadcrumbs, Link } from "@mui/material";

export default function Page() {
  const router = useRouter();
  let { id } = useParams();
  if (Array.isArray(id)) {
    id = id.join();
  }

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
          แก้ไขข้อมูลสถานีเติมน้ำ
        </Link>
      </Breadcrumbs>
      <h1 className="text-3xl font-bold text-lightblue-900">
        แก้ไขข้อมูลสถานีเติมน้ำ
      </h1>
      <WaterStationForm isEdit={true} router={router} waterStationId={id} />
    </div>
  );
}
