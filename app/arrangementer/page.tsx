import React from "react";
import ContentContainer from "../../src/components/ContentContainer";
import styles from "./page.module.css";
import { events } from "../../src/data/events";

export default function Arrangementer() {
  // Function to generate Google Calendar URL
  const generateCalendarUrl = (event: any) => {
    // Parse the date string (assuming format like "15. juni 2025")
    const dateParts = event.date.split('.');
    const day = dateParts[0].trim();
    const restParts = dateParts[1].trim().split(' ');
    const month = restParts[0];
    const year = restParts[1];
    
    // Map Norwegian month names to numbers
    const monthMap: Record<string, string> = {
      'januar': '01', 'februar': '02', 'mars': '03', 'april': '04',
      'mai': '05', 'juni': '06', 'juli': '07', 'august': '08',
      'september': '09', 'oktober': '10', 'november': '11', 'desember': '12'
    };
    
    const monthNum = monthMap[month] || '01'; // Default to January if not found
    
    // Parse the time (assuming format like "12:00-16:00")
    const timeParts = event.time.split('-');
    const startTime = timeParts[0].trim();
    const endTime = timeParts.length > 1 ? timeParts[1].trim() : '';
    
    // Format dates for Google Calendar
    const startDate = `${year}${monthNum}${day.padStart(2, '0')}T${startTime.replace(':', '')}00`;
    const endDate = endTime 
      ? `${year}${monthNum}${day.padStart(2, '0')}T${endTime.replace(':', '')}00`
      : `${year}${monthNum}${day.padStart(2, '0')}T${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}${startTime.split(':')[1]}00`;
    
    // Create Google Calendar URL with location including the full address
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(`${event.location}, ${event.address}`)}`;
    
    return calendarUrl;
  };

  return (
    <ContentContainer>
      <div className={styles.container}>
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className={styles.day}>{event.day}</span>
                <span className={styles.month}>{event.month}</span>
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
                    <span>{event.time}</span>
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
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
