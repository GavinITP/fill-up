"use client";
import { useState } from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { userService } from "@/api/user";

export default function OwnerRegisterPanel() {
  const { data: session } = useSession();
  const [tel, setTel] = useState("");
  const [citizenId, setCitizenId] = useState("");

  const register = async () => {
    if (!session) return;
    const response = await userService.registerOwner(
      session.user._id,
      tel,
      citizenId,
    );
    if (response.success) {
      window.location.href = "/";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex w-[95%] flex-col items-center justify-start gap-6 rounded-xl border border-gray-300 bg-white p-4 md:p-8 lg:w-4/5">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <TextBox
          setInputValue={() => {}}
          title="ชื่อ - นามสกุล"
          placeholder={session ? session.user.name : ""}
          disabled
        />
        <TextBox
          setInputValue={() => {}}
          title="อีเมลล์"
          placeholder={session ? session.user.email : ""}
          disabled
        />
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <TextBox
          setInputValue={setTel}
          title="เบอร์โทรศัพท์"
          placeholder="กรุณากรอกเบอร์โทรศัพท์"
          value={tel}
        />
        <TextBox
          setInputValue={setCitizenId}
          title="หมายเลขบัตรประชาชน"
          placeholder="กรุณากรอกหมายเลขบัตรประชาชน"
          value={citizenId}
        />
      </div>

      <Button color="blue" label="ลงทะเบียน" onClick={register} />
    </div>
  );
}
