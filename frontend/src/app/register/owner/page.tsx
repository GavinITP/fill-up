import Logo from "../../../../public/logo.svg";
import Image from "next/image";
import OwnerRegisterPanel from "@/components/register/OwnerRegisterPanel";

export default function Page() {
  return (
    <div className="flex w-screen flex-col items-center gap-4 bg-white p-5 lg:justify-center lg:gap-8">
      <Image src={Logo.src} width={145} height={117} alt="Fill up" />
      <h3 className="text-center text-3xl font-semibold text-lightblue-900">
        ลงทะเบียนเจ้าของสถานีเติมน้ำ
      </h3>
      <OwnerRegisterPanel />
    </div>
  );
}
