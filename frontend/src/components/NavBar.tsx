"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import AdminNavigateSegment from "./admin/AdminNavigateSegment";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter(Boolean);

  const isUserLoginPage =
    pathSegments.length > 0 && ["login", "register"].includes(pathSegments[0]);
  const isAdminLoginPage =
    pathSegments.length >= 2 && ["login"].includes(pathSegments[1]);

  const isHidden = isUserLoginPage || isAdminLoginPage;

  //Needed to check with role of the user
  //But for demo, use the path is okay
  const isAdmin = session?.user.role == "ADMIN";
  const isWaterStationOwner = session?.user.role == "OWNER";

  const [isMenuShow, setIsMenuShow] = useState(false);

  return (
    !isHidden && (
      <div
        className={`sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between px-6 shadow-md ${isAdmin ? "bg-lightblue-900" : "bg-white"}`}
      >
        <div className="flex h-full flex-row items-center justify-start gap-6">
          <Link
            href={"/"}
            className={`py-2 ${isAdmin ? "pointer-events-none" : ""}`}
          >
            <Image
              className="w-16"
              width={Logo.width}
              height={Logo.height}
              src={Logo.src}
              alt="Fill up"
            />
          </Link>
          {isAdmin && <AdminNavigateSegment />}
        </div>
        <div
          className="relative flex cursor-pointer flex-row items-center gap-2 py-2"
          onClick={() => setIsMenuShow(!isMenuShow)}
        >
          <span
            className={`text-5xl ${isAdmin ? "text-white" : "text-zinc-400"}`}
          >
            <AccountCircleRoundedIcon fontSize="inherit" />
          </span>
          <div
            className={`flex flex-col ${isAdmin ? "text-white" : "text-black"}`}
          >
            <span className="text-base font-normal">
              {session ? session.user.name : ""}
            </span>
            <span className="text-xs font-normal">
              {isAdmin ? "แอดมิน" : "ผู้ใช้/เจ้าของสถานีเติมน้ำ"}
            </span>
          </div>
          {isMenuShow && (
            <div className="absolute right-0 top-[5rem] flex h-fit w-fit min-w-40 flex-col items-center justify-center divide-y overflow-hidden rounded-lg border border-newgray-200 bg-white text-base shadow-lg">
              {isWaterStationOwner && (
                <Link
                  href="/dashboard"
                  className="w-full p-3 text-center hover:bg-newgray-200"
                >
                  Dashboard
                </Link>
              )}
              <button
                className="w-full p-3 hover:bg-newgray-200"
                onClick={async () =>
                  signOut({ redirect: true, callbackUrl: "/login" })
                }
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}
