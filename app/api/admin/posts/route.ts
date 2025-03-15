import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { isAuthenticatedFromRequest } from '@/utils/auth';

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

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
    // Check authentication
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json(
        { success: false, message: 'Ikke autentisert' },
        { status: 401 }
      );
    }
    
    const posts = await fs.readJSON(postsFilePath);
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
    const posts = await fs.readJSON(postsFilePath);
    
    // Generate a new ID
    const maxId = posts.reduce((max: number, post: any) => 
      post.id > max ? post.id : max, 0);
    newPost.id = maxId + 1;
    
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
    
    // Add the new post
    posts.push(newPost);
    
    // Save to file
    await fs.writeJSON(postsFilePath, posts, { spaces: 2 });
    
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
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
    const posts = await fs.readJSON(postsFilePath);
    
    // Find and update the post
    const index = posts.findIndex((p: any) => p.id === updatedPost.id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Innlegg ikke funnet' },
        { status: 404 }
      );
    }
    
    // Update the slug if title changed
    if (updatedPost.title !== posts[index].title && !updatedPost.slug) {
      updatedPost.slug = generateSlug(updatedPost.title);
    }
    
    // Update excerpt if content changed
    if (updatedPost.content !== posts[index].content && !updatedPost.excerpt) {
      updatedPost.excerpt = updatedPost.content.substring(0, 150).trim();
      if (updatedPost.content.length > 150) {
        updatedPost.excerpt += '...';
      }
    }
    
    posts[index] = updatedPost;
    
    // Save to file
    await fs.writeJSON(postsFilePath, posts, { spaces: 2 });
    
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
    
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '0');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Mangler ID' },
        { status: 400 }
      );
    }
    
    const posts = await fs.readJSON(postsFilePath);
    
    // Filter out the post to delete
    const filteredPosts = posts.filter((p: any) => p.id !== id);
    
    if (filteredPosts.length === posts.length) {
      return NextResponse.json(
        { success: false, message: 'Innlegg ikke funnet' },
        { status: 404 }
      );
    }
    
    // Save to file
    await fs.writeJSON(postsFilePath, filteredPosts, { spaces: 2 });
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, message: 'Serverfeil' },
      { status: 500 }
    );
  }
}
