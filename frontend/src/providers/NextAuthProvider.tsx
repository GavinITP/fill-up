"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: (Session & { expires: string }) | null;
}

export default function NextAuthProvider({
  children,
  session,
}: Props): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
