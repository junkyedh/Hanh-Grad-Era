import { NextResponse, type NextRequest } from "next/server";
import { getGuest } from "@/data/guests";

// Reject unknown invitations before streaming commits an HTTP 200 response.
export function proxy(request: NextRequest) {
  let slug: string;
  try {
    slug = decodeURIComponent(request.nextUrl.pathname.slice(1));
  } catch {
    slug = "";
  }

  if (getGuest(slug)) return NextResponse.next();

  // An unmatched multi-segment path renders the shared not-found page.
  return NextResponse.rewrite(new URL("/invitation/not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: ["/((?!favicon\\.ico$|next\\.svg$|vercel\\.svg$)[^/]+)"],
};
