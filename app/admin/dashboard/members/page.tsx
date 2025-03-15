"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './members.module.css';

type Member = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  color?: string;
};

// Fosskok color palette
const colorPalette = [
  "#E57373", // Red
  "#FFB74D", // Orange
  "#FFF176", // Yellow
  "#AED581", // Green
  "#4FC3F7", // Blue
  "#9575CD", // Purple
  "#F06292", // Pink
  "#4DB6AC", // Teal
];

export default function MembersAdmin() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
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
        
        // Fetch members data
        fetchMembers();
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/members');
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError('Failed to load members. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setCurrentMember(member);
    setName(member.name);
    setRole(member.role);
    setImageUrl(member.imageUrl || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Er du sikker på at du vil slette dette medlemmet?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/members?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete member');
      }
      
      // Refresh the members list
      fetchMembers();
    } catch (err) {
      setError('Failed to delete member. Please try again.');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberData = {
      id: currentMember?.id,
      name,
      role,
      imageUrl,
    };
    
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/members', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} member`);
      }
      
      // Reset form and refresh members list
      resetForm();
      fetchMembers();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} member. Please try again.`);
      console.error(err);
    }
  };

  const resetForm = () => {
    setCurrentMember(null);
    setName('');
    setRole('');
    setImageUrl('');
    setIsEditing(false);
  };

  // Get a random color from the palette
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Laster medlemmer...</div>
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
          <h1>Administrer medlemmer</h1>
        </div>
        <button 
          onClick={() => setIsEditing(false)} 
          className={styles.addButton}
        >
          Legg til nytt medlem
        </button>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>{isEditing ? 'Rediger medlem' : 'Legg til nytt medlem'}</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Navn</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="role">Rolle</label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">Bilde URL</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/placeholder-person.jpg"
                className={styles.input}
              />
              <small>La stå tom for å bruke standard platsholder med tilfeldig farge</small>
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
          <h2>Medlemmer ({members.length})</h2>
          
          {members.length === 0 ? (
            <p className={styles.emptyMessage}>Ingen medlemmer funnet.</p>
          ) : (
            <div className={styles.membersList}>
              {members.map((member) => (
                <div key={member.id} className={styles.memberCard}>
                  {member.imageUrl ? (
                    <div 
                      className={styles.memberImage}
                      style={{ backgroundImage: `url(${member.imageUrl})` }}
                    />
                  ) : (
                    <div 
                      className={styles.memberColor} 
                      style={{ backgroundColor: member.color || getRandomColor() }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className={styles.memberInfo}>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                  <div className={styles.memberActions}>
                    <button 
                      onClick={() => handleEdit(member)}
                      className={styles.editButton}
                    >
                      Rediger
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className={styles.deleteButton}
                    >
                      Slett
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
