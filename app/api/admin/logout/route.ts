import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Create response with success message
    const response = NextResponse.json({ success: true });
    
    // Clear auth cookie using our utility function
    return clearAuthCookie(response);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
