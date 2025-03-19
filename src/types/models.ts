// Define types for our data models

export interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  color: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
  excerpt?: string;
}

export interface User {
  id: number;
  username: string;
  password: string; // This is the hashed password
}

// API Response types
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}
