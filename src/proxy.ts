import { NextResponse, type NextRequest } from 'next/server';
import { getGuest } from '@/data/guests';

export function proxy(request: NextRequest) {
  let slug: string;
  try {
    slug = decodeURIComponent(request.nextUrl.pathname.slice(1));
  } catch {
    slug = '';
  }

  if (getGuest(slug)) return NextResponse.next();

  return NextResponse.rewrite(new URL('/invitation/not-found', request.url), {
    status: 404,
  });
}

export const config = {
  matcher: ['/((?!.*\\.)[^/]+)'],
};
