import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/utils/auth';
import { successResponse, handleApiError } from '@/src/utils/api';

export async function POST(request: NextRequest) {
  try {
    // Create response with success message
    const response = NextResponse.json(
      { success: true, message: 'Logget ut' }
    );
    
    // Clear auth cookie using our utility function
    return clearAuthCookie(response);
  } catch (error) {
    return handleApiError(error);
  }
}
