import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

export default function Gryta() {
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
