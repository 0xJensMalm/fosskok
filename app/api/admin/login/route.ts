import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/utils/auth';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { authConfig } from '@/src/config';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt received:', { username });
    
    // Direct credential check without MongoDB
    // Using environment variables directly
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'fosskok2025';
    
    console.log('Comparing with:', { 
      adminUsername, 
      configUsername: authConfig.adminUsername,
      match: username === adminUsername && password === adminPassword
    });
    
    // Simple authentication check against direct env values
    if (username !== adminUsername || password !== adminPassword) {
      console.log('Authentication failed');
      return NextResponse.json({ 
        success: false, 
        message: 'Ugyldig brukernavn eller passord',
        debug: true
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
    return handleApiError(error);
  }
}
