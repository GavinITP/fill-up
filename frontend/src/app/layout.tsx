import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

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

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${notoSansThai.className}`}>
        <NextAuthProvider session={session}>
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
