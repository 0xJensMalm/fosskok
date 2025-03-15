import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <Link href="/om-fosskok" className={styles.navLink}>
            Om Fosskok
          </Link>
          <Link href="/arrangementer" className={styles.navLink}>
            Arrangementer
          </Link>
        </div>
        
        <Link href="/" className={styles.logoContainer}>
          <h1 className={styles.logo}>Fosskok</h1>
        </Link>
        
        <div className={styles.navRight}>
          <Link href="/folka" className={styles.navLink}>
            Folka
          </Link>
          <Link href="/gryta" className={styles.navLink}>
            Gryta
          </Link>
        </div>
      </div>
      <div className={styles.divider}></div>
    </nav>
  );
};

export default Navbar;
