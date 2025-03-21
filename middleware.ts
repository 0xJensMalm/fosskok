import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from './utils/auth';

// TEMPORARILY DISABLED MIDDLEWARE - Just pass through all requests
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  
  console.log('Middleware disabled - passing through request for path:', pathname);
  
  // Continue for all requests
  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
