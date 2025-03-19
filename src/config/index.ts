// Centralized configuration for the application

// Site information
export const siteConfig = {
  name: 'Fosskok',
  description: 'Et kunstkollektiv dedikert til kreativitet og fellesskap',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fosskok.no',
};

// API paths
export const apiPaths = {
  events: '/api/events',
  members: '/api/members',
  posts: '/api/posts',
  admin: {
    login: '/api/admin/login',
    logout: '/api/admin/logout',
    checkAuth: '/api/admin/check-auth',
    events: '/api/admin/events',
    members: '/api/admin/members',
    posts: '/api/admin/posts',
    upload: '/api/admin/upload',
  },
};

// Data file paths
export const dataFilePaths = {
  events: 'events',
  members: 'members',
  posts: 'posts',
  users: 'users',
  auth: 'auth',
};

// Authentication settings
export const authConfig = {
  cookieName: 'fosskok_admin_auth',
  cookieMaxAge: 60 * 60 * 24, // 1 day in seconds
};

// Date formatting options
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};
