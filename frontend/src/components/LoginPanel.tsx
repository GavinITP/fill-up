"use client";
import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import { userService } from "@/api/user";
import { adminService } from "@/api/admin";
import { signIn } from "next-auth/react";

export default function LoginPanel(props: { type: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await (props.type == "user"
      ? userService.loginUser(email, password)
      : adminService.loginAdmin(email, password));
    if (response.success) {
      // Use NextAuth's signIn method to set session
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      window.location.href =
        props.type == "user" ? "/" : "/admin/owner-requests";
    } else {
      alert("Login failed");
    }
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
