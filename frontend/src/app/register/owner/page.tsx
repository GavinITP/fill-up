import Logo from "../../../../public/logo.svg";
import Image from "next/image";
import OwnerRegisterPanel from "@/components/register/OwnerRegisterPanel";

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-white p-5">
      <Image src={Logo.src} width={145} height={117} alt="Fill up" />
      <h3 className="text-3xl font-semibold text-lightblue-900">
        ลงทะเบียนเจ้าของสถานีเติมน้ำ
      </h3>
      <OwnerRegisterPanel />
    </div>
  );
}
