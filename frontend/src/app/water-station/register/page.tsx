import WaterStationForm from "@/components/WaterStationForm";
import { Breadcrumbs, Link } from "@mui/material";

export default function Page() {
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
            ลงทะเบียนสถานีเติมน้ำ
        </Link>
    ];

    return (
        <div className="flex w-full flex-col items-center justify-start gap-8 px-16 py-16">
            <Breadcrumbs separator="›" aria-label="breadcrumb" className="w-full font-sans">
                {breadcrumbs}
            </Breadcrumbs>
            <h1 className="text-lightblue-900 text-3xl font-bold">
                ลงทะเบียนสถานีเติมน้ำ
            </h1>
            <WaterStationForm />
        </div>
    );
}