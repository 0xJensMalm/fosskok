"use client";

import React from 'react';
import Link from 'next/link';

export default function TestDashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Test Dashboard</h1>
        <p>This is a test dashboard without authentication</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ 
          flex: '1', 
          minWidth: '200px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Members</h2>
          <p>Manage members here</p>
        </div>
        
        <div style={{ 
          flex: '1', 
          minWidth: '200px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Events</h2>
          <p>Manage events here</p>
        </div>
        
        <div style={{ 
          flex: '1', 
          minWidth: '200px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Blog Posts</h2>
          <p>Manage blog posts here</p>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
