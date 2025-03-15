"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './events.module.css';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
};

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
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
        
        // Fetch events data
        fetchEvents();
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/events');
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setTitle(event.title);
    setDate(formatDateForInput(event.date));
    setLocation(event.location);
    setDescription(event.description);
    setImageUrl(event.imageUrl || '');
    setIsEditing(true);
  };

  // Format date from ISO string to YYYY-MM-DD for input field
  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
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
    if (!confirm('Er du sikker på at du vil slette dette arrangementet?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      // Refresh the events list
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event. Please try again.');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      id: currentEvent?.id,
      title,
      date: new Date(date).toISOString(),
      location,
      description,
      imageUrl: imageUrl || undefined,
    };
    
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/events', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} event`);
      }
      
      // Reset form and refresh events list
      resetForm();
      fetchEvents();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`);
      console.error(err);
    }
  };

  const resetForm = () => {
    setCurrentEvent(null);
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setImageUrl('');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Laster arrangementer...</div>
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
          <h1>Administrer arrangementer</h1>
        </div>
        <button 
          onClick={() => setIsEditing(false)} 
          className={styles.addButton}
        >
          Legg til nytt arrangement
        </button>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>{isEditing ? 'Rediger arrangement' : 'Legg til nytt arrangement'}</h2>
          
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
              <label htmlFor="date">Dato</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="location">Sted</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description">Beskrivelse</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.textarea}
                rows={5}
              />
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
          <h2>Arrangementer ({events.length})</h2>
          
          {events.length === 0 ? (
            <p className={styles.emptyMessage}>Ingen arrangementer funnet.</p>
          ) : (
            <div className={styles.eventsList}>
              {events.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <h3>{event.title}</h3>
                    <div className={styles.eventActions}>
                      <button 
                        onClick={() => handleEdit(event)}
                        className={styles.editButton}
                      >
                        Rediger
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className={styles.deleteButton}
                      >
                        Slett
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.eventDetails}>
                    <p className={styles.eventDate}>
                      <strong>Dato:</strong> {formatDateForDisplay(event.date)}
                    </p>
                    <p className={styles.eventLocation}>
                      <strong>Sted:</strong> {event.location}
                    </p>
                    <p className={styles.eventDescription}>
                      {event.description.length > 150 
                        ? `${event.description.substring(0, 150)}...` 
                        : event.description}
                    </p>
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
