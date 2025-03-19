import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest } from '@/utils/auth';
import { getCollection } from '@/utils/data';

// Helper function to generate a slug from a title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .trim();
};

// GET all posts
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin routes
    if (request.url.includes('/api/admin/') && !isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const postsCollection = await getCollection('posts');
    const posts = await postsCollection.find().sort().toArray();
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}

// POST - create a new post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const newPost = await request.json();
    const postsCollection = await getCollection('posts');
    
    // Generate a slug if not provided
    if (!newPost.slug) {
      newPost.slug = generateSlug(newPost.title);
    }
    
    // Set the date if not provided
    if (!newPost.date) {
      newPost.date = new Date().toISOString();
    }
    
    // Generate excerpt if not provided
    if (!newPost.excerpt && newPost.content) {
      // Take first 150 characters of content as excerpt
      newPost.excerpt = newPost.content.substring(0, 150).trim();
      if (newPost.content.length > 150) {
        newPost.excerpt += '...';
      }
    }
    
    // Insert the new post
    const result = await postsCollection.insertOne(newPost);
    
    // Return the created post with its ID
    return NextResponse.json({
      ...newPost,
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

// PUT - update a post
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const updatedPost = await request.json();
    const postsCollection = await getCollection('posts');
    
    // Get the ID and remove it from the update object
    const { id, ...postData } = updatedPost;
    
    // Update the slug if title changed
    if (updatedPost.title !== postData.title && !updatedPost.slug) {
      updatedPost.slug = generateSlug(updatedPost.title);
    }
    
    // Update excerpt if content changed
    if (updatedPost.content !== postData.content && !updatedPost.excerpt) {
      updatedPost.excerpt = updatedPost.content.substring(0, 150).trim();
      if (updatedPost.content.length > 150) {
        updatedPost.excerpt += '...';
      }
    }
    
    // Update the post
    const result = await postsCollection.updateOne(
      { id: id },
      { $set: updatedPost }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Innlegg ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}

// DELETE - delete a post
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
    
    const postsCollection = await getCollection('posts');
    
    // Delete the post
    const result = await postsCollection.deleteOne({ id: parseInt(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Innlegg ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
