"use client";
import { useState } from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import CheckBox from "../Checkbox";
import { userService } from "@/api/user";
import { signIn } from "next-auth/react";

export default function RegisterPanel() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterOwner, setIsRegisterOwner] = useState(false);

  const register = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Register the user
    const response = await userService.registerUser(fullName, email, password);
    if (response.success) {
      // Automatically log in the user
      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginResult?.error) {
        alert("Registration successful, but login failed");
      } else {
        // Redirect after successful login
        if (isRegisterOwner) {
          window.location.href = "/register/owner";
        } else {
          window.location.href = "/";
        }
      }
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-6 rounded-xl bg-white p-8">
      <TextBox
        setInputValue={setFullName}
        title="ชื่อ - นามสกุล"
        placeholder="กรุณากรอกชื่อ - นามสกุล"
        value={fullName}
      />
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
      <TextBox
        setInputValue={setConfirmPassword}
        title="ยืนยันรหัสผ่าน"
        placeholder="กรุณายืนยันรหัสผ่าน"
        password
        value={confirmPassword}
      />
      <CheckBox
        title="สมัครเป็นเจ้าของสถานีเติมน้ำ"
        subTitle="สามารถสมัครเพิ่มเติมได้ในภายหลัง"
        setInputValue={setIsRegisterOwner}
      ></CheckBox>
      <Button color="blue" label="ลงทะเบียน" onClick={register} />
    </div>
  );
}
