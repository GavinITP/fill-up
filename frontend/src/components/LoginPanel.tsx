"use client";
import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    alert(email + ":" + password);
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-7 rounded-xl bg-white p-8">
      <TextBox
        setInputValue={setEmail}
        title="อีเมลล์"
        placeholder="กรุณากรอกอีเมลล์"
      />
      <TextBox
        setInputValue={setPassword}
        title="รหัสผ่าน"
        placeholder="กรุณากรอกรหัสผ่าน"
      />
      <Button color="blue" label="ลงชื่อเข้าใช้" onClick={login} />
    </div>
  );
}
