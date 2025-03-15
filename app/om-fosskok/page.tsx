"use client";

import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function OmFosskok() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.description}>
            <p>
              Fosskok er et kunstkollektiv som ble etablert i 2020 med formål om å skape et levende fellesskap 
              for kunstnere og kreative sjeler i Oslo. Vi tror på kraften i samarbeid, deling av ideer, og at 
              kunst skal være tilgjengelig for alle.
            </p>
            <p>
              Vårt mål er å fremme kunst og kultur gjennom ulike arrangementer, utstillinger og workshops, 
              og å skape et inkluderende miljø hvor kreativitet kan blomstre. Vi jobber aktivt for å bygge 
              broer mellom ulike kunstformer og skape møteplasser for både etablerte og nye stemmer.
            </p>
            <p>
              Gryta er Fosskok sitt kreative verksted og visningsrom på Hammer Prestegård i Lørenskog. Her arrangerer vi workshops, 
              utstillinger, konserter og andre kulturelle arrangementer gjennom hele året. Stedet fungerer som et 
              samlingspunkt for kunstnere og publikum, og er åpent for alle som er interessert i kunst og kultur.
            </p>
            <p>
              Vi samarbeider med lokale kunstnere, kulturinstitusjoner og næringsliv for å skape et mangfoldig 
              program som reflekterer regionens kreative energi. Fosskok er også et sted for eksperimentering og 
              utforskning, hvor nye ideer og prosjekter kan ta form og vokse.
            </p>
          </div>
          
          <div className={styles.infoBox}>
            <h2>Besøk Oss</h2>
            <div className={styles.infoItem}>
              <strong>Adresse:</strong>
              <p>Hammer Prestegård, Hammerveien 26, 1474 Lørenskog</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Kontakt:</strong>
              <p>post@fosskok.no</p>
              <p>+47 123 45 678</p>
            </div>
            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1996.0641069037377!2d10.987731315917973!3d59.93912798187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46417afb5c4a9d4f%3A0x7b7d0f4b6a8c4a2a!2sHammerveien%2026%2C%201474%20L%C3%B8renskog!5e0!3m2!1sen!2sno!4v1710512702!5m2!1sen!2sno" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Fosskok location"
                className={styles.googleMap}
              />
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
