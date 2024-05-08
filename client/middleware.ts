import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const isAuthenticated = !!req.cookies.get("token");
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/forgot-password") ||
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
    } else {
      return NextResponse.next();
    }
  } else {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/forgot-password", "/sign-in", "/sign-up", "/home", "/v/:path*"],
};
