import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest, authMiddleware } from '@/utils/auth';
import { getCollection } from '@/utils/data';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { Member } from '@/src/types/models';

// GET all members
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin routes
    if (request.url.includes('/api/admin/') && !isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const membersCollection = await getCollection('members');
    const members = await membersCollection.find().sort().toArray<Member>();
    
    return successResponse(members);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - create a new member
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const newMember = await request.json();
    const membersCollection = await getCollection('members');
    
    // Insert the new member
    const result = await membersCollection.insertOne<Member>(newMember);
    
    if (!result.success) {
      return errorResponse('Kunne ikke opprette medlem', 500);
    }
    
    // Return the created member with its ID
    return successResponse({
      ...newMember,
      id: result.insertedId
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - update a member
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
    }
    
    const updatedMember = await request.json();
    const membersCollection = await getCollection('members');
    
    // Get the ID and remove it from the update object
    const { id, ...memberData } = updatedMember;
    
    // Update the member
    const result = await membersCollection.updateOne<Member>(
      { id: id },
      memberData
    );
    
    if (!result.success || result.modifiedCount === 0) {
      return errorResponse('Medlem ikke funnet', 404);
    }
    
    return successResponse(updatedMember);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - delete a member
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
    
    const membersCollection = await getCollection('members');
    
    // Delete the member
    const result = await membersCollection.deleteOne<Member>({ id });
    
    if (!result.success || result.deletedCount === 0) {
      return errorResponse('Medlem ikke funnet', 404);
    }
    
    return successResponse(null, 'Medlem slettet');
  } catch (error) {
    return handleApiError(error);
  }
}
