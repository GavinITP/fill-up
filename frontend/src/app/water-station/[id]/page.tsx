import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import Image from "next/image";
import ReportModal from "@/components/ReportModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

function convertToDateThai(date: Date) {
  const month_th = [
    "",
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  try {
    date = new Date(date);
  } catch (e) {
    return null;
  }
  return (
    date.getDate() +
    " " +
    month_th[date.getMonth() + 1] +
    " " +
    (date.getFullYear() + 543)
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
  const waterstationData = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <div className="container mx-auto my-10 px-12">
      <p className="my-6 text-left text-gray-500">
        <Link href="/" className="no-underline hover:underline">
          ค้นหาสถานีเติมน้ำ
        </Link>
        <KeyboardArrowRightIcon />
        <span className="text-black no-underline hover:underline">
          {waterstationData.name}
        </span>
      </p>
      <div className="h-fit w-full rounded-lg border-2 border-gray-300 p-3 lg:p-9">
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <div>
            <h1 className="mb-1 text-left text-5xl font-black text-[#01579B]">
              {waterstationData.name}
            </h1>
            <p className="text-left text-gray-500">
              ปรับปรุงล่าสุด: {convertToDateThai(waterstationData.updatedAt)}
            </p>
          </div>
          <ReportModal
            waterstationId={params.id}
            waterstationName={waterstationData.name}
          />
        </div>
        <div className="mx-3 my-5 grid grid-cols-2 gap-4">
          <Image
            className="order-1 col-span-2 m-2 h-full w-auto justify-self-center rounded-lg lg:order-2 lg:col-span-1"
            src="/images/default.png"
            alt="Default card image"
            width={1000}
            height={1000}
          />
          <div className="order-2 col-span-2 flex flex-col gap-5 lg:order-1 lg:col-span-1">
            <div className="flex flex-col gap-2">
              <h2 className="text-left text-lg font-semibold">ที่อยู่:</h2>
              <p className="text-left text-gray-600 lg:pl-6">
                {waterstationData.address}
              </p>
            </div>
            <div className="flex gap-2">
              <h2 className="text-left text-lg font-semibold">อุณหภูมิน้ำ:</h2>
              {waterstationData.waterTemperature.map((temperature) => (
                <span
                  className={`rounded-full px-3 py-1 text-xs leading-5 bg-${temperature === "ร้อน" ? "red" : temperature === "เย็น" ? "blue" : "green"}-100`}
                  key={temperature}
                >
                  <span
                    className={`text-${temperature === "ร้อน" ? "red" : temperature === "เย็น" ? "blue" : "green"}-600`}
                  >
                    {temperature}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <h2 className="text-left text-lg font-semibold">ราคา:</h2>
              {waterstationData.isFree ? (
                <p className="my-auto text-left text-sm text-[#2196F3]">ฟรี</p>
              ) : (
                <p className="my-auto text-left text-sm text-[#2196F3]">
                  ไม่ฟรี
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <h2 className="text-left text-lg font-semibold">
                ผู้ที่ได้รับอนุญาต:
              </h2>
              {waterstationData.permission.map((permission) => (
                <span
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs leading-5 text-black"
                  key={permission}
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
          <div className="order-3 col-span-2 flex flex-col gap-2">
            <h2 className="text-left text-lg font-semibold">
              รายละเอียดการบำรุงรักษา:
            </h2>
            <p className="text-left text-gray-600 lg:pl-6">
              {waterstationData.maintenanceDetails}
            </p>
          </div>
        </div>
        {waterstationData.note !== "" && (
          <div className="flex flex-col rounded-lg bg-red-200 p-3">
            <h2 className="text-left text-lg font-semibold">
              บันทึกจากผู้ดูแลระบบ:
            </h2>
            <p className="text-left text-gray-600 lg:pl-6">
              {waterstationData.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
