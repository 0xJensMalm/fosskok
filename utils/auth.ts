import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Cookie name for authentication
const AUTH_COOKIE = 'fosskok_auth';

// Hard-coded credentials (in a real app, these would be stored securely)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'fosskok2023';

// Validate login credentials
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Set authentication cookie
export function setAuthCookie(response: NextResponse): NextResponse {
  // Set cookie for 24 hours (in seconds)
  response.cookies.set({
    name: AUTH_COOKIE,
    value: 'true',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
  
  return response;
}

// Clear authentication cookie
export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: AUTH_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  
  return response;
}
