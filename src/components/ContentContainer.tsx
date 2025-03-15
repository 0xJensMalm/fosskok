import React from 'react';
import styles from './ContentContainer.module.css';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => {
  return (
    <main className={styles.contentContainer}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
};

export default ContentContainer;
