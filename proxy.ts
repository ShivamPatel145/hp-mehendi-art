import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET || "fallback_secret";
const key = new TextEncoder().encode(secretKey);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isOnLogin = req.nextUrl.pathname.startsWith('/admin/login');

  if (isOnAdmin && !isOnLogin) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      await jwtVerify(token, key);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (isOnLogin && token) {
    try {
      await jwtVerify(token, key);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // Invalid token, allow access to login page
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
