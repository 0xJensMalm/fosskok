"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporarily set to true to bypass auth check
  const [loading, setLoading] = useState(false); // Set to false to skip loading state
  const router = useRouter();

  // Temporarily comment out the authentication check
  /*
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth/');
        if (!response.ok) {
          // Not authenticated, redirect to login
          router.push('/admin/');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);
  */

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout/', { method: 'POST' });
      router.push('/admin/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Laster...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Fosskok Admin</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logg ut
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav className={styles.nav}>
            <Link href="/admin/dashboard/" className={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/admin/dashboard/members/" className={styles.navLink}>
              Medlemmer
            </Link>
            <Link href="/admin/dashboard/events/" className={styles.navLink}>
              Arrangementer
            </Link>
            <Link href="/admin/dashboard/blog/" className={styles.navLink}>
              Blogginnlegg
            </Link>
          </nav>
        </div>

        <main className={styles.main}>
          <h2>Velkommen til Fosskok Admin</h2>
          <p>Velg en kategori fra menyen til venstre for å administrere innhold.</p>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Medlemmer</h3>
              <div className={styles.statValue}>4</div>
              <Link href="/admin/dashboard/members/" className={styles.statLink}>
                Administrer medlemmer
              </Link>
            </div>
            
            <div className={styles.statCard}>
              <h3>Arrangementer</h3>
              <div className={styles.statValue}>2</div>
              <Link href="/admin/dashboard/events/" className={styles.statLink}>
                Administrer arrangementer
              </Link>
            </div>
            
            <div className={styles.statCard}>
              <h3>Blogginnlegg</h3>
              <div className={styles.statValue}>1</div>
              <Link href="/admin/dashboard/blog/" className={styles.statLink}>
                Administrer blogginnlegg
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
