export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (session?.role == "ADMIN") return NextResponse.next();
    else return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    if (session?.role == "OWNER") return NextResponse.next();
    else return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session?.role == "OWNER" || session?.role == "USER")
    return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/admin/:path*", "/water-station/:path*", "/dashboard"],
};
