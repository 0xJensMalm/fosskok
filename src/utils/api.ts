import { NextResponse } from 'next/server';
import { ApiResponse } from '@/src/types/models';

/**
 * Create a successful API response
 * @param data Optional data to include in the response
 * @param message Optional success message
 * @returns NextResponse with JSON data
 */
export function successResponse<T>(data?: T, message?: string): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}

/**
 * Create an error API response
 * @param message Error message
 * @param status HTTP status code (default: 400)
 * @returns NextResponse with JSON error
 */
export function errorResponse(message: string, status: number = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

/**
 * Handle API errors and return appropriate response
 * @param error Error object
 * @returns NextResponse with JSON error
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return errorResponse(error.message, 500);
  }
  
  return errorResponse('An unexpected error occurred', 500);
}
