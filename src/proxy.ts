import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protect all routes except the landing page, login page, and register API
  matcher: [
    "/((?!$|login|api/register|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
