import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {currentYear} Fosskok. Alle rettigheter reservert.</p>
      </div>
    </footer>
  );
};

export default Footer;
