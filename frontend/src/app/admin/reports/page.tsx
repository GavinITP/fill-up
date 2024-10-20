import ReportCard from "@/components/admin/ReportCard";

export default function Page() {
  const reportList = [
    {
      waterStationName: "Name...............",
      date: "2021-2-2",
      details:
        "เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... ",
    },
    {
      waterStationName: "Name...............",
      date: "2021-2-2",
      details:
        "เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... เนื้อหาที่ร้องเรียน สัก 3 บรรทัด แอดมิสชันฮวงจุ้ยเรตติ้งเชฟ กุนซือ มิวสิคปิยมิตรพาสต้าอพาร์ตเมนต์รุสโซ ซิตี้ตู้เซฟ เทอร์โบโครนาอมาตยาธิปไตยราชานุญาต โบตั๋นอิมพีเรียล.... ",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-lightblue-900 text-3xl font-bold">
        จัดการคำร้องเรียน
      </h1>
      <div className="grid w-full grid-cols-1 gap-12">
        {reportList.map((report, index) => (
          <ReportCard key={index} {...report} />
        ))}
      </div>
    </div>
  );
}
