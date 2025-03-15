import React from "react";
import ContentContainer from "../src/components/ContentContainer";
import styles from "./page.module.css";
import Link from "next/link";
import { getUpcomingEvents } from "../src/data/events";

export default function Home() {
  // Get the 3 most upcoming events
  const upcomingEvents = getUpcomingEvents(3);

  return (
    <ContentContainer>
      <div className={styles.homeLayout}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Velkommen til Fosskok</h1>
          <p className={styles.description}>
            Et kunstkollektiv dedikert til kreativitet og fellesskap.
          </p>
          <div className={styles.introText}>
            <p>
              Fosskok er et samlingspunkt for kunstnere og kreative sjeler som ønsker å 
              utforske og dele sine ideer i et inkluderende miljø.
            </p>
            <p>
              Vi arrangerer utstillinger, konserter, workshops og andre kulturelle 
              arrangementer gjennom hele året.
            </p>
          </div>
        </div>
        
        <div className={styles.sideContent}>
          <h2 className={styles.sideTitle}>Kommende arrangementer</h2>
          <div className={styles.eventsList}>
            {upcomingEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <span className={styles.day}>{event.day}</span>
                  <span className={styles.month}>{event.month}</span>
                </div>
                <div className={styles.eventDetails}>
                  <h3>{event.title}</h3>
                  <p className={styles.eventTime}>{event.location} - {event.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/arrangementer" className={styles.viewAllLink}>
            Se alle arrangementer
          </Link>
        </div>
      </div>
    </ContentContainer>
  );
}
