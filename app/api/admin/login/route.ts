import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/utils/auth';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { authConfig } from '@/src/config';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
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
