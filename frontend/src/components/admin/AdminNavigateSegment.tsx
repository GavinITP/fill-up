import Link from "next/link";

export default function AdminNavigateSegment() {
  const MenuList = [
    { title: "รับรองเจ้าของสถานีเติมน้ำ", link: "/owner-requests" },
    { title: "จัดการคำร้องเรียน", link: "/reports" },
    { title: "รับรองสถานีเติมน้ำ", link: "/water-station-requests" },
  ];

  const MenuButton = (title: string, link: string) => {
    return (
      <Link
        href={link}
        className="hover:bg-lightblue-200 hover:text-lightblue-900 h-full w-fit content-center bg-none px-5 text-white"
      >
        {title}
      </Link>
    );
  };

  return (
    <div className="flex h-full w-fit flex-row items-center justify-between">
      {MenuList.map((menu) => {
        return MenuButton(menu.title, "/admin" + menu.link);
      })}
    </div>
  );
}
