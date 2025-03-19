import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedFromRequest, authMiddleware } from '@/utils/auth';
import { getCollection } from '@/utils/data';
import { successResponse, errorResponse, handleApiError } from '@/src/utils/api';
import { Post } from '@/src/types/models';

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
      return errorResponse('Ikke autentisert', 401);
    }
    
    const postsCollection = await getCollection('posts');
    const posts = await postsCollection.find().sort().toArray<Post>();
    
    return successResponse(posts);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - create a new post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
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
    const result = await postsCollection.insertOne<Post>(newPost);
    
    if (!result.success) {
      return errorResponse('Kunne ikke opprette innlegg', 500);
    }
    
    // Return the created post with its ID
    return successResponse({
      ...newPost,
      id: result.insertedId
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - update a post
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return errorResponse('Ikke autentisert', 401);
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
    const result = await postsCollection.updateOne<Post>(
      { id: id },
      updatedPost
    );
    
    if (!result.success || result.modifiedCount === 0) {
      return errorResponse('Innlegg ikke funnet', 404);
    }
    
    return successResponse(updatedPost);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - delete a post
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
    
    const postsCollection = await getCollection('posts');
    
    // Delete the post
    const result = await postsCollection.deleteOne<Post>({ id });
    
    if (!result.success || result.deletedCount === 0) {
      return errorResponse('Innlegg ikke funnet', 404);
    }
    
    return successResponse(null, 'Innlegg slettet');
  } catch (error) {
    return handleApiError(error);
  }
}
