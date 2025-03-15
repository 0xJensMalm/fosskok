import React from "react";
import ContentContainer from "../src/components/ContentContainer";
import styles from "./page.module.css";
import Link from "next/link";

// Example event data - in a real application, this would come from a database or API
const upcomingEvents = [
  {
    id: 1,
    title: "Elektronisk Aften",
    date: "20. mars 2025",
    time: "20:00 - 23:00",
    day: "20",
    month: "MAR"
  },
  {
    id: 2,
    title: "Workshop: Kreativ Skriving",
    date: "5. april 2025",
    time: "12:00 - 16:00",
    day: "05",
    month: "APR"
  },
  {
    id: 3,
    title: "Sommerutstilling 2025",
    date: "15. juni 2025",
    time: "12:00 - 18:00",
    day: "15",
    month: "JUN"
  }
];

export default function Home() {
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
                  <p className={styles.eventTime}>{event.time}</p>
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
