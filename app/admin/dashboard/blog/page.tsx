"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './blog.module.css';

type Post = {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (!response.ok) {
          // Not authenticated, redirect to login
          router.push('/admin');
          return;
        }
        
        // Fetch posts data
        fetchPosts();
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.content);
    setImageUrl(post.imageUrl || '');
    setIsEditing(true);
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('no-NO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Er du sikker på at du vil slette dette innlegget?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      // Refresh the posts list
      fetchPosts();
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      id: currentPost?.id,
      title,
      author,
      content,
      imageUrl: imageUrl || undefined,
      // These will be generated on the server if not provided
      date: currentPost?.date || new Date().toISOString(),
      slug: currentPost?.slug,
      excerpt: currentPost?.excerpt,
    };
    
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/posts', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post`);
      }
      
      // Reset form and refresh posts list
      resetForm();
      fetchPosts();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`);
      console.error(err);
    }
  };

  const resetForm = () => {
    setCurrentPost(null);
    setTitle('');
    setAuthor('');
    setContent('');
    setImageUrl('');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Laster blogginnlegg...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/dashboard" className={styles.backButton}>
            ← Tilbake til dashboard
          </Link>
          <h1>Administrer blogginnlegg</h1>
        </div>
        <button 
          onClick={() => setIsEditing(false)} 
          className={styles.addButton}
        >
          Legg til nytt innlegg
        </button>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>{isEditing ? 'Rediger innlegg' : 'Legg til nytt innlegg'}</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Tittel</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="author">Forfatter</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content">Innhold</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className={styles.textarea}
                rows={10}
              />
              <small>Støtter markdown formatering</small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">Bilde URL (valgfritt)</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitButton}>
                {isEditing ? 'Oppdater' : 'Legg til'}
              </button>
              
              <button 
                type="button" 
                onClick={resetForm} 
                className={styles.cancelButton}
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
        
        <div className={styles.listSection}>
          <h2>Blogginnlegg ({posts.length})</h2>
          
          {posts.length === 0 ? (
            <p className={styles.emptyMessage}>Ingen blogginnlegg funnet.</p>
          ) : (
            <div className={styles.postsList}>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <h3>{post.title}</h3>
                    <div className={styles.postActions}>
                      <button 
                        onClick={() => handleEdit(post)}
                        className={styles.editButton}
                      >
                        Rediger
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className={styles.deleteButton}
                      >
                        Slett
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.postMeta}>
                    <span className={styles.postAuthor}>Av: {post.author}</span>
                    <span className={styles.postDate}>{formatDateForDisplay(post.date)}</span>
                  </div>
                  
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
