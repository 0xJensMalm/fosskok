"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Check if we're on the Gryta page and on mobile
  const isGrytaAndMobile = pathname === '/gryta' && isMobile;

  // If we're on Gryta page and on mobile, redirect to home
  useEffect(() => {
    if (isGrytaAndMobile) {
      window.location.href = '/';
    }
  }, [isGrytaAndMobile]);
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Mobile menu button */}
        <button 
          className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.active : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Desktop navigation */}
        <div className={styles.navLeft}>
          <Link 
            href="/om-fosskok" 
            className={styles.navLink}
            aria-current={pathname === '/om-fosskok' ? 'page' : undefined}
          >
            Om Fosskok
          </Link>
          <Link 
            href="/arrangementer" 
            className={styles.navLink}
            aria-current={pathname === '/arrangementer' ? 'page' : undefined}
          >
            Arrangementer
          </Link>
        </div>
        
        <Link href="/" className={styles.logoContainer}>
          <h1 className={styles.logo}>Fosskok</h1>
        </Link>
        
        <div className={styles.navRight}>
          <Link 
            href="/folka" 
            className={styles.navLink}
            aria-current={pathname === '/folka' ? 'page' : undefined}
          >
            Folka
          </Link>
          {/* Hide Gryta link on mobile */}
          {!isMobile && (
            <Link 
              href="/gryta" 
              className={styles.navLink}
              aria-current={pathname === '/gryta' ? 'page' : undefined}
            >
              Gryta
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <Link 
            href="/om-fosskok" 
            className={styles.mobileNavLink}
            aria-current={pathname === '/om-fosskok' ? 'page' : undefined}
          >
            Om Fosskok
          </Link>
          <Link 
            href="/arrangementer" 
            className={styles.mobileNavLink}
            aria-current={pathname === '/arrangementer' ? 'page' : undefined}
          >
            Arrangementer
          </Link>
          <Link 
            href="/folka" 
            className={styles.mobileNavLink}
            aria-current={pathname === '/folka' ? 'page' : undefined}
          >
            Folka
          </Link>
          {/* No Gryta link on mobile */}
        </div>
      </div>
      
      <div className={styles.divider}></div>
    </nav>
  );
};

export default Navbar;
