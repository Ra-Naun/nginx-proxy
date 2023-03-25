// eslint-disable-next-line
import type { NextRequest, NextFetchEvent } from 'next/server';

export function middleware(request: NextRequest, ev: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    // This logic is only applied to /about
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard
  }
}
