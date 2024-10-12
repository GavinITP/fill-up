"use client";
import { usePathname } from "next/navigation";

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
      <div className="sticky top-0 z-50 h-16 w-full bg-white shadow-md">
        Nav Bar
      </div>
    )
  );
}
