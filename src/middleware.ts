import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile","/dashboard"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*","/dashboard/:path*", "/login"],
};
