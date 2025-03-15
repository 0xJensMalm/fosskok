import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');

// GET all events - public endpoint, no authentication required
export async function GET(request: NextRequest) {
  try {
    const events = await fs.readJSON(eventsFilePath);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
