import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Fill Up",
  description: "",
};

const notoSansThai = Noto_Sans_Thai({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin", "thai"],
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
