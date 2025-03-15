import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function Gryta() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Gryta</h1>
        
        <div className={styles.content}>
          <div className={styles.description}>
            <p>
              Gryta er Fosskok sitt kreative verksted og visningsrom. Her arrangerer vi workshops, 
              utstillinger, konserter og andre kulturelle arrangementer.
            </p>
            <p>
              Stedet fungerer som et samlingspunkt for kunstnere og publikum, 
              og er åpent for alle som er interessert i kunst og kultur.
            </p>
          </div>
          
          <div className={styles.infoBox}>
            <h2>Besøk Gryta</h2>
            <div className={styles.infoItem}>
              <strong>Adresse:</strong>
              <p>Kunstnergata 12, 0123 Oslo</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Åpningstider:</strong>
              <p>Onsdag-Fredag: 12:00-18:00</p>
              <p>Lørdag-Søndag: 12:00-16:00</p>
              <p>Mandag-Tirsdag: Stengt</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Kontakt:</strong>
              <p>gryta@fosskok.no</p>
              <p>+47 123 45 678</p>
            </div>
          </div>
        </div>
        
        <div className={styles.upcomingEvents}>
          <h2>Kommende arrangementer i Gryta</h2>
          <div className={styles.eventsList}>
            <div className={styles.eventItem}>
              <div className={styles.eventDate}>
                <span className={styles.day}>20</span>
                <span className={styles.month}>MAR</span>
              </div>
              <div className={styles.eventDetails}>
                <h3>Elektronisk Aften</h3>
                <p>En kveld med elektronisk musikk fra lokale artister.</p>
                <p className={styles.eventTime}>20:00 - 23:00</p>
              </div>
            </div>
            
            <div className={styles.eventItem}>
              <div className={styles.eventDate}>
                <span className={styles.day}>05</span>
                <span className={styles.month}>APR</span>
              </div>
              <div className={styles.eventDetails}>
                <h3>Workshop: Kreativ Skriving</h3>
                <p>En workshop i kreativ skriving ledet av forfatter Anna Nilsen.</p>
                <p className={styles.eventTime}>12:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
