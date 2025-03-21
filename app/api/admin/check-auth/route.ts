import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check for auth cookie
    const authCookie = request.cookies.get('fosskok_auth');
    const isAuthenticated = authCookie?.value === 'true';
    
    console.log('Auth check:', { isAuthenticated });
    
    if (isAuthenticated) {
      return NextResponse.json({ 
        success: true, 
        authenticated: true 
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      authenticated: false,
      message: 'Ikke autentisert' 
    }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      success: false, 
      authenticated: false,
      message: 'En feil oppstod under autentisering' 
    }, { status: 500 });
  }
}
