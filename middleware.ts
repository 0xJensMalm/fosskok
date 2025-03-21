import { NextRequest, NextResponse } from 'next/server';

// Simple middleware that just passes through all requests
// We'll implement authentication at the page level instead
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Only match admin routes - we'll handle auth in the pages
export const config = {
  matcher: ['/admin/:path*'],
};
