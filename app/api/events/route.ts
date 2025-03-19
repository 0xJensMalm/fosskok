import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/utils/data';

// GET all events - public endpoint, no authentication required
export async function GET(request: NextRequest) {
  try {
    const eventsCollection = await getCollection('events');
    const events = await eventsCollection.find().sort().toArray();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
