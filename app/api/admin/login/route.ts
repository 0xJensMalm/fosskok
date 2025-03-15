import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import bcrypt from 'bcryptjs';
import { setAuthCookie } from '@/utils/auth';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Read users from file
    const users = await fs.readJSON(usersFilePath);
    
    // Find user
    const user = users.find((u: any) => u.username === username);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Ugyldig brukernavn eller passord' },
        { status: 401 }
      );
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Ugyldig brukernavn eller passord' },
        { status: 401 }
      );
    }
    
    // Create response with success message
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie using our utility function
    return setAuthCookie(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
