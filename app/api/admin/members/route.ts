import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { isAuthenticatedFromRequest } from '@/utils/auth';

const membersFilePath = path.join(process.cwd(), 'data', 'members.json');

// Helper function to check authentication from request
// const isAuthenticated = (request: NextRequest): boolean => {
//   const authCookie = request.cookies.get('fosskok_admin_auth');
//   return authCookie?.value === 'true';
// };

// GET all members
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
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
    const members = await fs.readJSON(membersFilePath);
    
    // Generate a new ID
    const maxId = members.reduce((max: number, member: any) => 
      member.id > max ? member.id : max, 0);
    newMember.id = maxId + 1;
    
    // Add the new member
    members.push(newMember);
    
    // Save to file
    await fs.writeJSON(membersFilePath, members, { spaces: 2 });
    
    return NextResponse.json(newMember);
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
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
    const members = await fs.readJSON(membersFilePath);
    
    // Find and update the member
    const index = members.findIndex((m: any) => m.id === updatedMember.id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Medlem ikke funnet' },
        { status: 404 }
      );
    }
    
    // Preserve the color if it exists and is not being updated
    if (!updatedMember.color && members[index].color) {
      updatedMember.color = members[index].color;
    }
    
    members[index] = updatedMember;
    
    // Save to file
    await fs.writeJSON(membersFilePath, members, { spaces: 2 });
    
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
    
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '0');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Mangler ID' },
        { status: 400 }
      );
    }
    
    const members = await fs.readJSON(membersFilePath);
    
    // Filter out the member to delete
    const filteredMembers = members.filter((m: any) => m.id !== id);
    
    if (filteredMembers.length === members.length) {
      return NextResponse.json(
        { success: false, message: 'Medlem ikke funnet' },
        { status: 404 }
      );
    }
    
    // Save to file
    await fs.writeJSON(membersFilePath, filteredMembers, { spaces: 2 });
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
