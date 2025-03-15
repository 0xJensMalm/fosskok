import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { isAuthenticatedFromRequest } from '@/utils/auth';

const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');

// Helper function to check authentication from request
// const isAuthenticated = (request: NextRequest): boolean => {
//   const authCookie = request.cookies.get('fosskok_admin_auth');
//   return authCookie?.value === 'true';
// };

// GET all events
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
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

// POST - create a new event
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const newEvent = await request.json();
    const events = await fs.readJSON(eventsFilePath);
    
    // Generate a new ID
    const maxId = events.reduce((max: number, event: any) => 
      event.id > max ? event.id : max, 0);
    newEvent.id = maxId + 1;
    
    // Add the new event
    events.push(newEvent);
    
    // Save to file
    await fs.writeJSON(eventsFilePath, events, { spaces: 2 });
    
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}

// PUT - update an event
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const updatedEvent = await request.json();
    const events = await fs.readJSON(eventsFilePath);
    
    // Find and update the event
    const index = events.findIndex((e: any) => e.id === updatedEvent.id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Arrangement ikke funnet' },
        { status: 404 }
      );
    }
    
    events[index] = updatedEvent;
    
    // Save to file
    await fs.writeJSON(eventsFilePath, events, { spaces: 2 });
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}

// DELETE - delete an event
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '0');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Mangler ID' },
        { status: 400 }
      );
    }
    
    const events = await fs.readJSON(eventsFilePath);
    
    // Filter out the event to delete
    const filteredEvents = events.filter((e: any) => e.id !== id);
    
    if (filteredEvents.length === events.length) {
      return NextResponse.json(
        { success: false, message: 'Arrangement ikke funnet' },
        { status: 404 }
      );
    }
    
    // Save to file
    await fs.writeJSON(eventsFilePath, filteredEvents, { spaces: 2 });
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
