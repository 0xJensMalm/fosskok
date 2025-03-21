import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from '@/src/config';

// Check if user is authenticated using request cookies
export function isAuthenticatedFromRequest(request: NextRequest): boolean {
  const authCookie = request.cookies.get(authConfig.cookieName);
  return authCookie?.value === 'true';
}

// Check if user is authenticated in a server component
export function isAuthenticatedInServerComponent(request: NextRequest): boolean {
  const authCookie = request.cookies.get(authConfig.cookieName);
  return authCookie?.value === 'true';
}

// Middleware to check authentication
export function authMiddleware(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    if (!isAuthenticatedFromRequest(req)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    return handler(req);
  };
}

// Set authentication cookie
export function setAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: authConfig.cookieName,
    value: 'true',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: authConfig.cookieMaxAge,
    path: '/',
  });
  
  return response;
}

// Clear authentication cookie
export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: authConfig.cookieName,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
  
  return response;
}
