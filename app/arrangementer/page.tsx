import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";
import fs from 'fs-extra';
import path from 'path';

// Define the Event type
interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  address: string;
}

// Fetch events data from the JSON file directly in the server component
async function getEvents(): Promise<Event[]> {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  try {
    return await fs.readJSON(eventsFilePath);
  } catch (error) {
    console.error('Error reading events data:', error);
    return [];
  }
}

// Helper function to format date from ISO string to display format
function formatDate(dateString: string): { day: string, month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  
  // Get month abbreviation in Norwegian
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DES'];
  const month = months[date.getMonth()];
  
  return { day, month };
}

// Helper function to format time from ISO string to display format
function formatTime(dateString: string, endDateString?: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  if (!endDateString) {
    return `${hours}:${minutes}`;
  }
  
  const endDate = new Date(endDateString);
  const endHours = endDate.getHours().toString().padStart(2, '0');
  const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}-${endHours}:${endMinutes}`;
}

export default async function Arrangementer() {
  // Fetch events data
  const events = await getEvents();
  
  // Function to generate Google Calendar URL
  const generateCalendarUrl = (event: Event) => {
    const startDate = new Date(event.date);
    const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default to 2 hours later
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSS format)
    const formatCalendarDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15);
    };
    
    const startDateFormatted = formatCalendarDate(startDate);
    const endDateFormatted = formatCalendarDate(endDate);
    
    // Create Google Calendar URL
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(`${event.location}, ${event.address}`)}`;
  };

  return (
    <ContentContainer>
      <div className={styles.container}>
        <div className={styles.eventsGrid}>
          {events.map((event) => {
            const { day, month } = formatDate(event.date);
            const time = formatTime(event.date, event.endDate);
            
            return (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <span className={styles.day}>{day}</span>
                  <span className={styles.month}>{month}</span>
                </div>
                <div className={styles.eventContent}>
                  <h2 className={styles.eventTitle}>{event.title}</h2>
                  
                  <div className={styles.eventInfo}>
                    <div className={styles.eventLocation}>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                      </svg>
                      <div>
                        <div className={styles.locationName}>{event.location}</div>
                        <div className={styles.locationAddress}>{event.address}</div>
                      </div>
                    </div>
                    
                    <div className={styles.eventTime}>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                      </svg>
                      <span>{time}</span>
                    </div>
                  </div>
                  
                  <div className={styles.eventDescription}>{event.description}</div>
                  
                  <div className={styles.cardFooter}>
                    <a 
                      href={generateCalendarUrl(event)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.calendarButton}
                    >
                      <svg className={styles.calendarIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z" fill="currentColor"/>
                      </svg>
                      Legg til i kalender
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContentContainer>
  );
}
