"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

// Social media icons component
const SocialMediaIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <a 
        href="https://www.instagram.com/fosskoksamvirkelag/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.socialIcon}
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a 
        href="https://www.facebook.com/profile.php?id=61571690984113" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.socialIcon}
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>
      <a 
        href="https://www.youtube.com/@augustkann6840" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.socialIcon}
        aria-label="YouTube"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      </a>
    </div>
  );
};

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
          {/* Social Media Icons */}
          <SocialMediaIcons />
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
          
          {/* Social Media Icons for mobile */}
          <div className={styles.mobileSocialContainer}>
            <SocialMediaIcons />
          </div>
        </div>
      </div>
      
      <div className={styles.divider}></div>
    </nav>
  );
};

export default Navbar;
