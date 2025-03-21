import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Logout request received');
    
    // Create response with success message
    const response = NextResponse.json(
      { success: true, message: 'Logget ut' }
    );
    
    // Clear auth cookie using our utility function
    return clearAuthCookie(response);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'En feil oppstod under utlogging'
    }, { status: 500 });
  }
}
