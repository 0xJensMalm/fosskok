"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
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
          <Link 
            href="/gryta" 
            className={styles.navLink}
            aria-current={pathname === '/gryta' ? 'page' : undefined}
          >
            Gryta
          </Link>
        </div>
      </div>
      <div className={styles.divider}></div>
    </nav>
  );
};

export default Navbar;
