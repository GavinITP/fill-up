"use client";
import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import { userService } from "@/api/user";
import { signIn } from "next-auth/react";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await userService.loginUser(email, password);
    if (response.success) {
      // Use NextAuth's signIn method to set session
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      window.location.href = "/search";
    } else {
      alert("Login failed");
    }
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
