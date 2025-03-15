"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './events.module.css';

type Event = {
  id: number;
  title: string;
  date: string;
  endDate: string | null;
  location: string;
  address: string;
  description: string;
};

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setDate(event.date);
    setEndDate(event.endDate ?? '');
    setLocation(event.location);
    setAddress(event.address);
    setDescription(event.description);
    setIsEditing(true);
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
    
    if (!title || !date || !location || !address || !description) {
      setError('Alle feltene må fylles ut');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const eventData = {
        id: currentEvent?.id,
        title,
        date,
        endDate: endDate || undefined,
        location,
        address,
        description
      };
      
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDate('');
    setEndDate('');
    setLocation('');
    setAddress('');
    setDescription('');
    setIsEditing(false);
    setCurrentEvent(null);
    setError(null);
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
          onClick={() => {
            resetForm();
            setIsEditing(false);
          }} 
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
              <label htmlFor="endDate">Sluttdato</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                rows={4}
                placeholder="Skriv en beskrivelse av arrangementet"
                required
              />
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Lagrer...' : isEditing ? 'Oppdater arrangement' : 'Legg til arrangement'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  onClick={resetForm}
                >
                  Avbryt
                </button>
              )}
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
                      <strong>Dato:</strong> {event.date}
                    </p>
                    {event.endDate && (
                      <p className={styles.eventEndDate}>
                        <strong>Sluttdato:</strong> {event.endDate}
                      </p>
                    )}
                    <p className={styles.eventLocation}>
                      <strong>Sted:</strong> {event.location}
                    </p>
                    <p className={styles.eventAddress}>
                      <strong>Adresse:</strong> {event.address}
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
