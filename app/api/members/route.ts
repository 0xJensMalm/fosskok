import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

const membersFilePath = path.join(process.cwd(), 'data', 'members.json');

// GET all members - public endpoint, no authentication required
export async function GET(request: NextRequest) {
  try {
    const members = await fs.readJSON(membersFilePath);
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
