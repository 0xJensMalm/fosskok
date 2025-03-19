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
 * @param data Optional additional data to include in the response
 * @returns NextResponse with JSON error
 */
export function errorResponse<T>(message: string, status: number = 400, data?: T): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      data,
    },
    { status }
  );
}

/**
 * Handle API errors and return appropriate response
 * @param error Error object
 * @param data Optional additional data to include in the response
 * @returns NextResponse with JSON error
 */
export function handleApiError<T>(error: unknown, data?: T): NextResponse<ApiResponse> {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return errorResponse(error.message, 500, data);
  }
  
  return errorResponse('An unexpected error occurred', 500, data);
}
