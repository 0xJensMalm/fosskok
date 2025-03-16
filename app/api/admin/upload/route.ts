import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from '@/utils/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Set body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};

// Handle image uploads
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Ingen fil lastet opp' },
        { status: 400 }
      );
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Filen må være et bilde' },
        { status: 400 }
      );
    }

    // Check file size (limit to 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Filen er for stor (maks 5MB)' },
        { status: 400 }
      );
    }

    // Create unique filename
    const buffer = await file.arrayBuffer();
    const filename = Date.now() + '-' + file.name.replace(/\s/g, '_').toLowerCase();
    
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Write the file
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, Buffer.from(buffer));
    
    // Return the path to the file (relative to the public directory)
    return NextResponse.json({ 
      success: true, 
      filePath: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
