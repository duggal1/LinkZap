
import { NextResponse } from "next/server";
import { auth } from "./server/auth";

export default auth(async function middleware(req) {
  const session = req.auth; // JWT session data from auth middleware
  const isAuth = !!session?.user; // Check if user is authenticated
  const userRole = session?.user?.role; // Extract role ("user" or "admin")
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");

  // Redirect authenticated users away from auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard and admin routes
  if (!isAuth) {
    if (isDashboardPage || isAdminPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (isAdminPage && userRole !== "admin") {
    // Restrict /admin to admin role (currently bypassed due to forced admin role in testing)
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow the request to proceed if no redirects are triggered
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};