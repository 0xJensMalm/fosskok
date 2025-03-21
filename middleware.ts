import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from './utils/auth';
import { errorResponse } from './src/utils/api';
import { authConfig } from './src/config';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // TEMPORARY: Log middleware execution for debugging
  console.log('Middleware executing for path:', pathname);
  
  // TEMPORARY: Bypass authentication for testing
  if (pathname === '/api/admin/login/' || pathname === '/api/admin/login') {
    console.log('Login endpoint detected, bypassing middleware');
    return NextResponse.next();
  }

  // Check if the path is for admin dashboard or admin API
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/api/admin')) {
    // Exclude the login API and check-auth API from authentication check
    if (pathname === '/api/admin/login' || 
        pathname === '/api/admin/login/' || 
        pathname === '/api/admin/check-auth' || 
        pathname === '/api/admin/check-auth/') {
      console.log('Auth endpoint excluded from check:', pathname);
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!isAuthenticatedFromRequest(request)) {
      console.log('User not authenticated for path:', pathname);
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
