// This file serves as the source of truth for event data
// In a real application, this would likely come from a database or API

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  address: string; 
  // For calendar display
  day: string;
  month: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "August Kann konsert",
    date: "15. april 2025",
    time: "12:00-18:00",
    description: "Vi inviterer til konsert med vår favoritt singer-songwriter, August Kann",
    location: "Hammer Prestegård",
    address: "Hammerveien 26, 1474 Lørenskog",
    day: "15",
    month: "APR"
  },
  {
    id: 2,
    title: "Workshop: Soppdyrking",
    date: "30. april 2025",
    time: "12:00-16:00",
    description: "Lær om soppdyrking",
    location: "Fosskok Studio",
    address: "Hammerveien 26, 1474 Lørenskog",
    day: "30",
    month: "APR"
  },
  {
    id: 3,
    title: "Elektronisk Aften",
    date: "20. april 2025",
    time: "20:00-23:00",
    description: "En kveld med elektronisk musikk fra lokale artister i Lørenskog Kirke.",
    location: "Lørenskog kirke",
    address: "Hammerveien 1, 1474 Lørenskog",
    day: "20",
    month: "APR"
  },
  {
    id: 4,
    title: "Ustilling: Blablablabla",
    date: "10. mai 2025",
    time: "11:00-17:00",
    description: "Vi åpner låven og inviterer til utstilling med Henrik Nordahl",
    location: "Hammer Prestegård",
    address: "Hammerveien 26, 1474 Lørenskog",
    day: "10",
    month: "MAI"
  },
  {
    id: 5,
    title: "Fosskok Festivalen 2025",
    date: "19. juni 2025",
    time: "18:00-20:00",
    description: "Samtale med kunstnere om trender og utvikling i samtidskunsten.",
    location: "Lørenskog kirke",
    address: "Hammerveien 1, 1474 Lørenskog",
    day: "19",
    month: "JUN"
  }
];

// Helper function to get upcoming events (sorted by date)
export const getUpcomingEvents = (limit?: number): Event[] => {
  // In a real app, we would sort by actual date objects
  // For this demo, we'll just return the first few events
  const sortedEvents = [...events].sort((a, b) => {
    // Simple sorting based on month abbreviation and day
    // This is just for demonstration - in a real app, use proper date objects
    const monthOrder: Record<string, number> = { 
      'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAI': 5, 'JUN': 6,
      'JUL': 7, 'AUG': 8, 'SEP': 9, 'OKT': 10, 'NOV': 11, 'DES': 12
    };
    
    const monthDiff = monthOrder[a.month] - monthOrder[b.month];
    if (monthDiff !== 0) return monthDiff;
    
    return parseInt(a.day) - parseInt(b.day);
  });
  
  return limit ? sortedEvents.slice(0, limit) : sortedEvents;
};
