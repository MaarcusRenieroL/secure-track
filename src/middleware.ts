import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";

const redirectBasedOnRole = (role: UserRole, pathname: string) => {
  if (pathname === "/") {
    const roleBasedUrl = `/${role.toLowerCase().replace("_", "-")}`;
    return roleBasedUrl;
  }
};

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({ req });
    const isAuth = !!token;

    const unprotectedRoutes = ["/auth/login", "/auth/register"];
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    if (!isAuth && !unprotectedRoutes.includes(pathname) && !isApiRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (["/auth/login", "/auth/register"].includes(req.nextUrl.pathname)) {
      if (isAuth && token.role && token.isOnboarded) {
        const url = redirectBasedOnRole(token.role as UserRole, pathname);
        if (url) {
          return NextResponse.redirect(new URL(url, req.url));
        }
      }
    }

    if (isAuth) {
      const url = redirectBasedOnRole(token.role as UserRole, pathname);
      if (url) {
        return NextResponse.redirect(new URL(url, req.url));
      }
      const role: string = token?.role as unknown as string;
      const routes = `/${role.toLowerCase().replace("_", "-")}`;
      const protectedRoutes = [
        "/super-admin",
        "/admin",
        "/crew",
        "/passenger",
        "/first-responders",
      ];

      if (protectedRoutes.some((path) => path.startsWith(path))) {
        if (isAuth && protectedRoutes.includes(pathname)) {
          if (pathname === routes || pathname.startsWith(routes)) {
            return;
          } else {
            return NextResponse.redirect(new URL(routes, req.url));
          }
        }
      }

      if (pathname === "/auth/login" || pathname === "/auth/register") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        await Promise.resolve();
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/app/:path*",
    "/auth/login",
    "/admin",
    "/super-admin",
    "/passenger",
    "/crew",
    "/auth/register",
    "/api/:path*",
    "/verify-user",
  ],
};
