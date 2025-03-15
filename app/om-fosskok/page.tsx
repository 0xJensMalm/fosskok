import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function OmFosskok() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Om Fosskok</h1>
        <div className={styles.content}>
          <p>
            Fosskok er et kunstkollektiv som ble etablert med formål om å skape et fellesskap 
            for kunstnere og kreative sjeler. Vi tror på kraften i samarbeid og deling av ideer.
          </p>
          <p>
            Vårt mål er å fremme kunst og kultur gjennom ulike arrangementer, utstillinger og workshops, 
            og å skape et inkluderende miljø hvor kreativitet kan blomstre.
          </p>
        </div>
      </div>
    </ContentContainer>
  );
}
