import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/utils/data';

// GET all members - public endpoint, no authentication required
export async function GET(request: NextRequest) {
  try {
    const membersCollection = await getCollection('members');
    const members = await membersCollection.find().sort().toArray();
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
