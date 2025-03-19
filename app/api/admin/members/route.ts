import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from '@/utils/auth';
import { getCollection } from '@/utils/data';

// GET all members
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin routes
    if (request.url.includes('/api/admin/') && !isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
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

// POST - create a new member
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const newMember = await request.json();
    const membersCollection = await getCollection('members');
    
    // Insert the new member
    const result = await membersCollection.insertOne(newMember);
    
    // Return the created member with its ID
    return NextResponse.json({
      ...newMember,
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

// PUT - update a member
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const updatedMember = await request.json();
    const membersCollection = await getCollection('members');
    
    // Get the ID and remove it from the update object
    const { id, ...memberData } = updatedMember;
    
    // Update the member
    const result = await membersCollection.updateOne(
      { id: id },
      { $set: memberData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Medlem ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}

// DELETE - delete a member
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
    
    const membersCollection = await getCollection('members');
    
    // Delete the member
    const result = await membersCollection.deleteOne({ id: parseInt(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Medlem ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
