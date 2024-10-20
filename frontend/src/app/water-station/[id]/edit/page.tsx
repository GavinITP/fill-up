"use client"

import WaterStationForm from "@/components/WaterStationForm";
import { useRouter } from 'next/navigation'
import { Breadcrumbs, Link } from "@mui/material";

export default function Page() {
    const router = useRouter();

    const breadcrumbs = [
        <Link
            underline="hover"
            color="inherit"
            href="/dashboard"
        >
            Dashboard
        </Link>,
        <Link
            underline="hover"
            color="text.primary"
            aria-current="page"
        >
            แก้ไขข้อมูลสถานีเติมน้ำ
        </Link>
    ];

    return (
        <div className="flex w-full flex-col items-center justify-start gap-8 px-16 py-16">
            <Breadcrumbs separator="›" aria-label="breadcrumb" className="w-full font-sans">
                {breadcrumbs}
            </Breadcrumbs>
            <h1 className="text-lightblue-900 text-3xl font-bold">
                แก้ไขข้อมูลสถานีเติมน้ำ
            </h1>
            <WaterStationForm isEdit={true} router={router} />
        </div>
    );
}