import LoginPanel from "@/components/LoginPanel";
import LoginLogo from "../../../../public/login-logo.svg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-lightblue-900 flex h-screen w-screen flex-row items-center justify-center gap-8 p-5">
      <div className="w-2/5">
        <Image
          src={LoginLogo.src}
          width={LoginLogo.width}
          height={LoginLogo.height}
          alt="Fill up"
        />
      </div>
      <div className="w-[30%]">
        <LoginPanel />
      </div>
    </div>
  );
}
