import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function OmFosskok() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Om Fosskok</h1>
        <div className={styles.content}>
          <div className={styles.description}>
            <p>
              Fosskok er et kunstkollektiv som ble etablert med formål om å skape et fellesskap 
              for kunstnere og kreative sjeler. Vi tror på kraften i samarbeid og deling av ideer.
            </p>
            <p>
              Vårt mål er å fremme kunst og kultur gjennom ulike arrangementer, utstillinger og workshops, 
              og å skape et inkluderende miljø hvor kreativitet kan blomstre.
            </p>
            <p>
              Gryta er Fosskok sitt kreative verksted og visningsrom. Her arrangerer vi workshops, 
              utstillinger, konserter og andre kulturelle arrangementer. Stedet fungerer som et 
              samlingspunkt for kunstnere og publikum, og er åpent for alle som er interessert i kunst og kultur.
            </p>
          </div>
          
          <div className={styles.infoBox}>
            <h2>Besøk Oss</h2>
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
              <p>post@fosskok.no</p>
              <p>+47 123 45 678</p>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
