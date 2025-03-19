import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from '@/utils/auth';
import { getCollection } from '@/utils/data';

// GET all events
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin routes
    if (request.url.includes('/api/admin/') && !isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
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
    const eventsCollection = await getCollection('events');
    
    // Insert the new event
    const result = await eventsCollection.insertOne(newEvent);
    
    // Return the created event with its ID
    return NextResponse.json({
      ...newEvent,
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil: ' + (error instanceof Error ? error.message : String(error)) },
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
    const eventsCollection = await getCollection('events');
    
    // Get the ID and remove it from the update object
    const { id, ...eventData } = updatedEvent;
    
    // Update the event
    const result = await eventsCollection.updateOne(
      { id: id },
      { $set: eventData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Arrangement ikke funnet' },
        { status: 404 }
      );
    }
    
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
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID er påkrevd' },
        { status: 400 }
      );
    }
    
    const eventsCollection = await getCollection('events');
    
    // Delete the event
    const result = await eventsCollection.deleteOne({ id: parseInt(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Arrangement ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
