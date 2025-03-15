import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";

// Example members data - in a real application, this would come from a database or API
const members = [
  {
    id: 1,
    name: "Mari Johansen",
    role: "Visuell kunstner",
    bio: "Mari jobber hovedsakelig med maleri og installasjon. Hennes arbeid utforsker temaer som natur og identitet.",
    imageUrl: "/placeholder-person.jpg" // Placeholder image - would be replaced with actual images
  },
  {
    id: 2,
    name: "Anders Berg",
    role: "Fotograf",
    bio: "Anders er en dokumentarfotograf med fokus på urbane landskap og hverdagslivet i byen.",
    imageUrl: "/placeholder-person.jpg"
  },
  {
    id: 3,
    name: "Sofie Larsen",
    role: "Musiker",
    bio: "Sofie er komponist og musiker med bakgrunn i elektronisk musikk og lydkunst.",
    imageUrl: "/placeholder-person.jpg"
  },
  {
    id: 4,
    name: "Thomas Olsen",
    role: "Forfatter",
    bio: "Thomas skriver poesi og kortprosa, og har utgitt flere diktsamlinger.",
    imageUrl: "/placeholder-person.jpg"
  }
];

export default function Folka() {
  return (
    <ContentContainer>
      <div className={styles.container}>
        <h1 className={styles.title}>Folka</h1>
        <p className={styles.intro}>
          Møt menneskene bak Fosskok - en samling av kunstnere, musikere, forfattere og kreative sjeler.
        </p>
        
        <div className={styles.membersGrid}>
          {members.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.memberImagePlaceholder}>
                {/* In a real app, this would be an actual image */}
                {member.name.charAt(0)}
              </div>
              <div className={styles.memberInfo}>
                <h2 className={styles.memberName}>{member.name}</h2>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
