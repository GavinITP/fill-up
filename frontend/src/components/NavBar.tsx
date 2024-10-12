"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Logo from "../../public/logo.svg";
import Link from "next/link";

export default function NavBar() {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter(Boolean);

  const isUserLoginPage =
    pathSegments.length > 0 && ["login", "register"].includes(pathSegments[0]);
  const isAdminLoginPage =
    pathSegments.length >= 2 && ["login"].includes(pathSegments[1]);

  const isHidden = isUserLoginPage || isAdminLoginPage;
  return (
    !isHidden && (
      <div className="sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between bg-white px-6 py-2 shadow-md">
        <Link href={"/"}>
          <Image
            className="w-16"
            width={Logo.width}
            height={Logo.height}
            src={Logo.src}
            alt="Fill up"
          />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <span className="text-5xl text-zinc-500">
            <AccountCircleRoundedIcon fontSize="inherit" />
          </span>
          <div className="flex flex-col">
            <span className="text-base font-normal text-black">
              UserName Lastname
            </span>
            <span className="text-xs font-normal text-black">
              ผู้ใช้/เจ้าของสถานีเติมน้ำ
            </span>
          </div>
        </div>
      </div>
    )
  );
}
