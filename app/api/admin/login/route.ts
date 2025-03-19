import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setAuthCookie } from '@/utils/auth';
import { getCollection } from '@/utils/data';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { User } from '@/src/types/models';
import { dataFilePaths } from '@/src/config';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Find user
    const user = await usersCollection.findOne<User>({ username });
    
    if (!user) {
      return errorResponse('Ugyldig brukernavn eller passord', 401);
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return errorResponse('Ugyldig brukernavn eller passord', 401);
    }
    
    // Create response with success message
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie using our utility function
    return setAuthCookie(response);
  } catch (error) {
    return handleApiError(error);
  }
}
