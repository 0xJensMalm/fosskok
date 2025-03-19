import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from '@/utils/auth';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { authConfig } from '@/src/config';

export async function GET(request: NextRequest) {
  try {
    if (isAuthenticatedFromRequest(request)) {
      return successResponse({ authenticated: true });
    }
    
    return errorResponse('Ikke autentisert', 401, { authenticated: false });
  } catch (error) {
    return handleApiError(error, { authenticated: false });
  }
}
