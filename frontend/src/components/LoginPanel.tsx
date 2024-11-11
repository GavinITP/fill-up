"use client";
import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import { signIn } from "next-auth/react";

export default function LoginPanel(props: { role: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = props.role;

  const login = async () => {
    // Use NextAuth's signIn method to set session
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    if (!res?.ok) alert("Login failed. Please check your credentials.");
    else
      window.location.href =
        props.role == "user" ? "/" : "/admin/owner-requests";
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-7 rounded-xl bg-white p-4 md:p-8">
      <TextBox
        setInputValue={setEmail}
        title="อีเมลล์"
        placeholder="กรุณากรอกอีเมลล์"
        value={email}
      />
      <TextBox
        setInputValue={setPassword}
        title="รหัสผ่าน"
        placeholder="กรุณากรอกรหัสผ่าน"
        password
        value={password}
      />
      <Button color="blue" label="ลงชื่อเข้าใช้" onClick={login} />
    </div>
  );
}
