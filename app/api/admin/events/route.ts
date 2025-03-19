import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest, authMiddleware } from '@/utils/auth';
import { getCollection } from '@/utils/data';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { Event } from '@/src/types/models';

// GET all events
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin routes
    if (request.url.includes('/api/admin/') && !isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const eventsCollection = await getCollection('events');
    const events = await eventsCollection.find().sort().toArray<Event>();
    
    return successResponse(events);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - create a new event
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const newEvent = await request.json();
    const eventsCollection = await getCollection('events');
    
    // Insert the new event
    const result = await eventsCollection.insertOne<Event>(newEvent);
    
    if (!result.success) {
      return errorResponse('Kunne ikke opprette arrangement', 500);
    }
    
    // Return the created event with its ID
    return successResponse({
      ...newEvent,
      id: result.insertedId
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - update an event
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const updatedEvent = await request.json();
    const eventsCollection = await getCollection('events');
    
    // Get the ID and remove it from the update object
    const { id, ...eventData } = updatedEvent;
    
    // Update the event
    const result = await eventsCollection.updateOne<Event>(
      { id: id },
      eventData
    );
    
    if (!result.success || result.modifiedCount === 0) {
      return errorResponse('Arrangement ikke funnet', 404);
    }
    
    return successResponse(updatedEvent);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - delete an event
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    // Get the ID from the URL
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '0');
    
    if (!id) {
      return errorResponse('Mangler ID', 400);
    }
    
    const eventsCollection = await getCollection('events');
    
    // Delete the event
    const result = await eventsCollection.deleteOne<Event>({ id });
    
    if (!result.success || result.deletedCount === 0) {
      return errorResponse('Arrangement ikke funnet', 404);
    }
    
    return successResponse(null, 'Arrangement slettet');
  } catch (error) {
    return handleApiError(error);
  }
}
