import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import Image from "next/image";
import ReportModal from '@/components/ReportModal';

function convertToDateThai( date: Date ) {
    var month_th = [
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
        "ธันวาคม"
    ];
    try {
        date = new Date(date);
    } catch (e) {
        return null;
    }
    return date.getDate()+" "+month_th[( date.getMonth()+1 )]+" "+( date.getFullYear()+543 );
}

export default async function Page({ params }: { params: { id: string } }) {
    const waterstationData = await fetch(`http://localhost:8080/water-station/${params.id}`).then((res) => res.json()).then((data) => data.data)
    return (
        <div className="container mx-auto px-12 my-10">
            <p className="my-6 text-left text-gray-500">
                <Link href="/" className="hover:underline no-underline">ค้นหาสถานีเติมน้ำ</Link>
                <KeyboardArrowRightIcon />
                <span className="text-black hover:underline no-underline">{waterstationData.name}</span>
            </p>
            <div className="rounded-lg border-gray-300 border-2 w-full h-fit lg:p-9 p-3">
                <div className="flex justify-between flex-col lg:flex-row gap-2">
                    <div>
                        <h1 className="text-left text-5xl font-black text-[#01579B] mb-1">{waterstationData.name}</h1>
                        <p className="text-left text-gray-500">ปรับปรุงล่าสุด: {convertToDateThai(waterstationData.updatedAt)}</p>
                    </div>
                    <ReportModal />
                </div>
                <div className="grid grid-cols-2 gap-4 my-5 mx-3">
                    <Image
                        className="h-full w-auto rounded-lg m-2 col-span-2 lg:col-span-1 order-1 lg:order-2 justify-self-center"
                        src="/images/default.png"
                        alt="Default card image"
                        width={1000}
                        height={1000}
                    />
                    <div className="flex flex-col gap-5 col-span-2 lg:col-span-1 order-2 lg:order-1">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-left text-lg font-semibold">ที่อยู่:</h2>
                            <p className="text-left text-gray-600 lg:pl-6">{waterstationData.address}</p>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-left text-lg font-semibold">อุณหภูมิน้ำ:</h2>
                            {
                                waterstationData.waterTemperature.map((temperature) => (
                                    <span className={`rounded-full px-3 py-1 text-xs leading-5 bg-${temperature === 'ร้อน' ? 'red' : temperature === 'เย็น' ? 'blue' : 'green'}-100`} key={temperature}>
                                        <span className={`text-${temperature === 'ร้อน' ? 'red' : temperature === 'เย็น' ? 'blue' : 'green'}-600`}>
                                            {temperature}
                                        </span>
                                    </span>
                                ))
                            }
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-left text-lg font-semibold">ราคา:</h2>
                            {waterstationData.isFree ? (
                                <p className="text-sm my-auto text-left text-[#2196F3]">ฟรี</p>
                            ) : (
                                <p className="text-sm my-auto text-left text-[#2196F3]">ไม่ฟรี</p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-left text-lg font-semibold">ผู้ที่ได้รับอนุญาติ:</h2>
                            {
                                waterstationData.permission.map((permission) => (
                                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs leading-5 text-black" key={permission}>
                                        {permission}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 order-3">
                        <h2 className="text-left text-lg font-semibold">รายละเอียดการบำรุงรักษา:</h2>
                        <p className="text-left text-gray-600 lg:pl-6">{waterstationData.maintenanceDetails}</p>
                    </div>
                </div>
                {
                    waterstationData.note !== '' && (
                        <div className="flex flex-col bg-red-200 rounded-lg p-3">
                            <h2 className="text-left text-lg font-semibold">บันทึกจากผู้ดูแลระบบ:</h2>
                            <p className="text-left text-gray-600 lg:pl-6">{waterstationData.note}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const params = await fetch('http://localhost:8080/water-station').then((res) => res.json())
    return params.data.map((station:any) => ({
        params: {
            id: station._id
        }
    }))
}
export const dynamicParams = false 
export const revalidate = 60