import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Test API endpoint called');
  
  return NextResponse.json({
    success: true,
    message: 'Test API endpoint working',
    timestamp: new Date().toISOString(),
    cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value])),
    headers: Object.fromEntries(
      Array.from(request.headers.entries()).map(([key, value]) => [key, value])
    )
  });
}
