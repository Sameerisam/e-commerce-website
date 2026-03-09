import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
  console.log("Middleware running for:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;
  console.log("Token found:", token);

  if (!token) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const { payload }: any = await jwtVerify(token, secret);
    console.log("Token valid. Payload:", payload);

    // Admin protection
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error("Invalid or expired token:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/cart_Products/:path*",
    "/delivery_Information/:path*",
    "/admin/:path*",
  ],
};
