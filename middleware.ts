import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from './utils/auth';
import { errorResponse } from './src/utils/api';
import { authConfig } from './src/config';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if the path is for admin dashboard or admin API
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/api/admin')) {
    // Exclude the login API and check-auth API from authentication check
    if (pathname === '/api/admin/login' || pathname === '/api/admin/check-auth') {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!isAuthenticatedFromRequest(request)) {
      // If trying to access dashboard, redirect to login page
      if (pathname.startsWith('/admin/dashboard')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      
      // If trying to access API, return 401 unauthorized
      return errorResponse('Ikke autentisert', 401);
    }
  }

  // Continue for all other requests
  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
