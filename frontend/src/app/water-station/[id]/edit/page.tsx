import WaterStationForm from "@/components/WaterStationForm";

export default function Page() {
    return (
        <div className="flex w-full flex-col items-center justify-start gap-8 px-16 py-16">
            <h1 className="text-lightblue-900 text-3xl font-bold">
                แก้ไขข้อมูลสถานีเติมน้ำ
            </h1>
            <WaterStationForm isEdit={true} />
        </div>
    );
}