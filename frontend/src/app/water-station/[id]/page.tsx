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
    return date.getDate()+" "+month_th[( date.getMonth()+1 )]+" "+( date.getFullYear()+543 );
}

export default function Page({ params }: { params: { id: string } }) {
    // const waterstationData = await fetch(`https://api.example.com/waterstation/${params.id}`)
    const waterstationData = {
        name: 'My Water station',
        latitude: 0,
        longitude: 0,
        address: 'หน้าห้องแลปชีวะ ชั้น 2 ณ อาคารประวัติศาสตร์พันปี โรงเรียนอีกาแห่งรัตติกาล จังหวัดสักแห่งในประเทศไหน',
        permission: ['Everyone', 'Tester'],
        waterTemperature: ['hot', 'cold', 'room temperature'],
        maintenanceDetails: 'บำรุงรักษาอย่างดีไม่มีห่วง ห่วงแต่จะไม่มีคนใช้ มากกว่า สเต็ปพาสตา แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ดยุคอัลมอนด์ ศากยบุตรม้านั่งตรวจทาน เซนเซอร์โบรกเกอร์คอปเตอร์เครป ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต พุดดิ้ง โบตั๋นอิมพีเรียล แตงโมสต็อกคาแร็คเตอร์ รองรับ วอล์คบิลไตรมาส ฮ็อตด็อกวอเตอร์มอบตัวซิตี แอพพริคอทปาสคาลช็อควิกพาเหรด',
        isFree: true,
        owner: 'owner',
        approvalStatus: 'pending',
        note: 'มีปัญหา',
        createdAt: new Date(),
        updatedAt: new Date()
    }
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
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs leading-5 text-blue-600">
                                เย็น
                            </span>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs leading-5 text-green-600">
                                ปกติ
                            </span>
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs leading-5 text-red-600">
                                ร้อน
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-left text-lg font-semibold">ราคา:</h2>
                            {waterstationData.isFree ? (
                                <p className="text-sm my-auto text-left text-[#2196F3]">ฟรี</p>
                            ) : (
                                <p className="text-sm my-auto text-left text-[#2196F3]">ราคาตามจริง</p>
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
    const params = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ]
    return params
}
export const dynamicParams = false 
export const revalidate = 60