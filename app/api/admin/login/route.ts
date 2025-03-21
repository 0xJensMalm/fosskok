import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/utils/auth';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { authConfig } from '@/src/config';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Debug log to see what values are being compared
    console.log('Login attempt:', {
      providedUsername: username,
      configUsername: authConfig.adminUsername,
      providedPassword: password,
      configPassword: authConfig.adminPassword,
      envUsername: process.env.ADMIN_USERNAME,
      envPassword: process.env.ADMIN_PASSWORD
    });
    
    // Return debug information in the response for testing
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_AUTH === 'true') {
      return NextResponse.json({
        success: false,
        debug: {
          providedUsername: username,
          configUsername: authConfig.adminUsername,
          providedPassword: password,
          configPassword: authConfig.adminPassword,
          envUsername: process.env.ADMIN_USERNAME,
          envPassword: process.env.ADMIN_PASSWORD,
          match: username === authConfig.adminUsername && password === authConfig.adminPassword
        },
        message: 'Authentication failed - Debug mode'
      }, { status: 401 });
    }
    
    // Simple authentication check against config values
    if (username !== authConfig.adminUsername || password !== authConfig.adminPassword) {
      return errorResponse('Ugyldig brukernavn eller passord', 401);
    }
    
    // Create response with success message
    const response = NextResponse.json({ 
      success: true,
      message: 'Innlogging vellykket'
    });
    
    // Set auth cookie using our utility function
    return setAuthCookie(response);
  } catch (error) {
    return handleApiError(error);
  }
}
