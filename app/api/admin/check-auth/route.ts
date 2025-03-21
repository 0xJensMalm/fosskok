import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Check if the authentication cookie exists in the request directly
    // This is more reliable for API routes in Next.js App Router
    const authCookie = request.cookies.get('fosskok_admin_auth');
    
    if (authCookie && authCookie.value === 'true') {
      return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json(
      { authenticated: false, message: 'Ikke autentisert' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
