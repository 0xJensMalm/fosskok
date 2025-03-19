# Fosskok Website

This is the official website for Fosskok, an art collective based in Norway. The site is built with Next.js and deployed on Vercel.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable UI components
- `public/` - Static assets
- `src/` - Source code
  - `config/` - Application configuration
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `utils/` - Core utilities for data access and authentication

## Admin Authentication

The admin section is protected by authentication. To access the admin dashboard:

1. Navigate to `/admin`
2. Log in with the admin credentials
3. You will be redirected to the admin dashboard at `/admin/dashboard`

### Setting Up Admin Credentials

Admin credentials are configured through environment variables:

- `ADMIN_USERNAME` - The admin username (default: "admin")
- `ADMIN_PASSWORD` - The admin password (default: "fosskok2025")

For production, you should set these environment variables in your Vercel project settings.

## Deployment on Vercel

### Prerequisites

1. A Vercel account
2. Git repository with this codebase

### Deployment Steps

1. Push your changes to the Git repository
2. Log in to your Vercel account
3. Import your Git repository
4. Configure the following environment variables:
   - `ADMIN_USERNAME` - Custom admin username
   - `ADMIN_PASSWORD` - Secure admin password
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://fosskok.no)

5. Deploy the application

### Production Considerations

- The application uses secure cookies in production
- Security headers are automatically added via the Vercel configuration
- The application is optimized for performance with Next.js's standalone output

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
