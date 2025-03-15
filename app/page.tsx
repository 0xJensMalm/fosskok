import React from "react";
import ContentContainer from "../src/components/ContentContainer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <ContentContainer>
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Velkommen til Fosskok</h1>
        <p className={styles.description}>
          Et kunstkollektiv dedikert til kreativitet og fellesskap.
        </p>
      </div>
    </ContentContainer>
  );
}
