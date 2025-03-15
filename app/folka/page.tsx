import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";
import Image from "next/image";
import fs from 'fs-extra';
import path from 'path';

// Define the Member type
interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  color?: string;
}

// Fetch members data from the JSON file directly in the server component
async function getMembers(): Promise<Member[]> {
  const membersFilePath = path.join(process.cwd(), 'data', 'members.json');
  try {
    return await fs.readJSON(membersFilePath);
  } catch (error) {
    console.error('Error reading members data:', error);
    return [];
  }
}

export default async function Folka() {
  // Fetch members data
  const members = await getMembers();

  return (
    <ContentContainer>
      <div className={styles.container}>
        <div className={styles.membersGrid}>
          {members.map((member: Member) => (
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
