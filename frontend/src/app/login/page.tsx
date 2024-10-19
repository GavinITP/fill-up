import LoginPanel from "@/components/LoginPanel";
import LoginLogo from "../../../public/login-logo.svg";
import Image from "next/image";
import Link from "@/components/Link";

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-8 bg-white p-5">
      <div className="w-2/5">
        <Image
          src={LoginLogo.src}
          width={LoginLogo.width}
          height={LoginLogo.height}
          alt="Fill up"
        />
      </div>
      <div className="flex w-[30%] flex-col gap-4">
        <div className="w-fill rounded-xl border border-gray-300">
          <LoginPanel />
        </div>
        <div className="flex flex-row justify-center gap-1">
          ยังไม่มีบัญชี?
          <Link title="ลงทะเบียน" href="/register"></Link>
        </div>
      </div>
    </div>
  );
}
