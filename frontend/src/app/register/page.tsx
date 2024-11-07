import RegisterPanel from "@/components/register/RegisterPanel";
import LoginLogo from "../../../public/login-logo.svg";
import Image from "next/image";
import Link from "@/components/Link";

export default function Page() {
  return (
    <div className="flex w-screen flex-col items-center gap-8 bg-white p-5 lg:h-screen lg:flex-row lg:justify-center">
      <div className="w-2/5 lg:w-2/5">
        <Image
          src={LoginLogo.src}
          width={LoginLogo.width}
          height={LoginLogo.height}
          alt="Fill up"
        />
      </div>
      <div className="flex w-[95%] flex-col gap-4 lg:w-[30%]">
        <div className="w-fill rounded-xl border border-gray-300">
          <RegisterPanel />
        </div>
        <div className="flex flex-row justify-center gap-1">
          มีบัญชีแล้ว?
          <Link title="ลงชื่อเข้าใช้" href="/login"></Link>
        </div>
      </div>
    </div>
  );
}
