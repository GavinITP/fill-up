import LoginPanel from "@/components/LoginPanel";
import LoginLogo from "../../../../public/login-logo.svg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-8 bg-lightblue-900 p-5">
      <div className="w-2/5">
        <Image
          src={LoginLogo.src}
          width={LoginLogo.width}
          height={LoginLogo.height}
          alt="Fill up"
        />
      </div>
      <div className="w-[30%]">
        <LoginPanel type="admin" />
      </div>
    </div>
  );
}
