import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";
import Image from "next/image";

// Example members data - in a real application, this would come from a database or API
const members = [
  {
    id: 1,
    name: "Mari Johansen",
    role: "Visuell kunstner",
    imageUrl: "/placeholder-person.jpg",
    color: "#E57373" // Light Red
  },
  {
    id: 2,
    name: "Anders Berg",
    role: "Fotograf",
    imageUrl: "/placeholder-person.jpg",
    color: "#64B5F6" // Light Blue
  },
  {
    id: 3,
    name: "Sofie Larsen",
    role: "Musiker",
    imageUrl: "/placeholder-person.jpg",
    color: "#81C784" // Light Green
  },
  {
    id: 4,
    name: "Thomas Olsen",
    role: "Forfatter",
    imageUrl: "/placeholder-person.jpg",
    color: "#FFD54F" // Light Amber
  },
  {
    id: 5,
    name: "Lise Pedersen",
    role: "Keramiker",
    imageUrl: "/placeholder-person.jpg",
    color: "#4DB6AC" // Light Teal
  },
  {
    id: 6,
    name: "Kristian Hansen",
    role: "Danser",
    imageUrl: "/placeholder-person.jpg",
    color: "#9575CD" // Light Deep Purple
  },
  {
    id: 7,
    name: "Emma Nilsen",
    role: "Tekstilkunstner",
    imageUrl: "/placeholder-person.jpg",
    color: "#F06292" // Light Pink
  },
  {
    id: 8,
    name: "Jonas Bakken",
    role: "Grafisk designer",
    imageUrl: "/placeholder-person.jpg",
    color: "#7986CB" // Light Indigo
  },
  {
    id: 9,
    name: "Ida Solheim",
    role: "Skuespiller",
    imageUrl: "/placeholder-person.jpg",
    color: "#4FC3F7" // Light Light Blue
  },
  {
    id: 10,
    name: "Markus Lie",
    role: "Billedhogger",
    imageUrl: "/placeholder-person.jpg",
    color: "#AED581" // Light Light Green
  },
  {
    id: 11,
    name: "Hanna Moen",
    role: "Illustratør",
    imageUrl: "/placeholder-person.jpg",
    color: "#FFB74D" // Light Orange
  },
  {
    id: 12,
    name: "Erik Dahl",
    role: "Filmskaper",
    imageUrl: "/placeholder-person.jpg",
    color: "#4DD0E1" // Light Cyan
  },
  {
    id: 13,
    name: "Nora Strand",
    role: "Kurator",
    imageUrl: "/placeholder-person.jpg",
    color: "#BA68C8" // Light Purple
  },
  {
    id: 14,
    name: "Petter Holm",
    role: "Arkitekt",
    imageUrl: "/placeholder-person.jpg",
    color: "#A1887F" // Light Brown
  },
  {
    id: 15,
    name: "Silje Vang",
    role: "Komponist",
    imageUrl: "/placeholder-person.jpg",
    color: "#90A4AE" // Light Blue Grey
  },
  {
    id: 16,
    name: "Morten Svendsen",
    role: "Poet",
    imageUrl: "/placeholder-person.jpg",
    color: "#E57373" // Light Red
  },
  {
    id: 17,
    name: "Kari Lund",
    role: "Glasskunstner",
    imageUrl: "/placeholder-person.jpg",
    color: "#64B5F6" // Light Blue
  },
  {
    id: 18,
    name: "Trond Jakobsen",
    role: "Treskjærer",
    imageUrl: "/placeholder-person.jpg",
    color: "#81C784" // Light Green
  },
  {
    id: 19,
    name: "Astrid Brekke",
    role: "Performancekunstner",
    imageUrl: "/placeholder-person.jpg",
    color: "#FFD54F" // Light Amber
  },
  {
    id: 20,
    name: "Lars Haugen",
    role: "Lydkunstner",
    imageUrl: "/placeholder-person.jpg",
    color: "#4DB6AC" // Light Teal
  },
  {
    id: 21,
    name: "Ingrid Tangen",
    role: "Smykkedesigner",
    imageUrl: "/placeholder-person.jpg",
    color: "#9575CD" // Light Deep Purple
  },
  {
    id: 22,
    name: "Ole Kristiansen",
    role: "Maler",
    imageUrl: "/placeholder-person.jpg",
    color: "#F06292" // Light Pink
  },
  {
    id: 23,
    name: "Camilla Berge",
    role: "Videokunstnert",
    imageUrl: "/placeholder-person.jpg",
    color: "#7986CB" // Light Indigo
  },
  {
    id: 24,
    name: "Stian Rønning",
    role: "Møbelsnekker",
    imageUrl: "/placeholder-person.jpg",
    color: "#4FC3F7" // Light Light Blue
  },
  {
    id: 25,
    name: "Marit Hagen",
    role: "Kunsthistoriker",
    imageUrl: "/placeholder-person.jpg",
    color: "#AED581" // Light Light Green
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
              <div className={styles.memberImageContainer}>
                <div 
                  className={styles.memberImagePlaceholder}
                  style={{ backgroundColor: member.color }}
                >
                  {member.name.charAt(0)}
                </div>
                {/* When you have actual images, use this instead:
                <Image 
                  src={member.imageUrl} 
                  alt={member.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.memberImage} 
                />
                */}
                <div className={styles.memberOverlay}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
