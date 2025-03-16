import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from './utils/auth';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if the path is for admin dashboard or admin API
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/api/admin')) {
    // Exclude the login API from authentication check
    if (pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!isAuthenticatedFromRequest(request)) {
      // If trying to access dashboard, redirect to login page
      if (pathname.startsWith('/admin/dashboard')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      
      // If trying to access API, return 401 unauthorized
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
  }

  // Continue for all other requests
  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
