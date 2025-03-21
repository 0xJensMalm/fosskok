import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, setAuthCookie } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt received for username:', username);
    
    // Validate credentials using our utility function
    if (!validateCredentials(username, password)) {
      console.log('Authentication failed');
      return NextResponse.json({ 
        success: false, 
        message: 'Ugyldig brukernavn eller passord'
      }, { status: 401 });
    }
    
    console.log('Authentication successful');
    
    // Create response with success message
    const response = NextResponse.json({ 
      success: true,
      message: 'Innlogging vellykket'
    });
    
    // Set auth cookie using our utility function
    return setAuthCookie(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'En feil oppstod under innlogging'
    }, { status: 500 });
  }
}
