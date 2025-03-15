"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function Gryta() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  // Redirect to home if on mobile
  useEffect(() => {
    if (isClient && isMobile) {
      router.push('/');
    }
  }, [isMobile, isClient, router]);

  // If we're on mobile, don't render the content
  if (isClient && isMobile) {
    return null;
  }

  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Gryta</h1>
        <div className={styles.stayTuned}>
          <p>Stay tuned...</p>
        </div>
      </div>
    </ContentContainer>
  );
}
