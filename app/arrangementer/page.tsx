import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

// Example event data - in a real application, this would come from a database or API
const events = [
  {
    id: 1,
    title: "Sommerutstilling 2025",
    date: "15. juni - 15. august 2025",
    description: "Vår årlige sommerutstilling med verk fra alle kollektivets medlemmer.",
    location: "Fosskok Galleri, Oslo"
  },
  {
    id: 2,
    title: "Workshop: Kreativ Skriving",
    date: "5. april 2025, 12:00-16:00",
    description: "En workshop i kreativ skriving ledet av forfatter Anna Nilsen.",
    location: "Fosskok Studio, Oslo"
  },
  {
    id: 3,
    title: "Konsert: Elektronisk Aften",
    date: "20. mars 2025, 20:00",
    description: "En kveld med elektronisk musikk fra lokale artister.",
    location: "Gryta, Oslo"
  }
];

export default function Arrangementer() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Arrangementer</h1>
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventLocation}>{event.location}</p>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
