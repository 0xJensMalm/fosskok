// Migration script to transfer data from JSON files to MongoDB
const fs = require('fs-extra');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'fosskok';

// Path to data files
const dataDir = path.join(process.cwd(), 'data');
const membersFilePath = path.join(dataDir, 'members.json');
const eventsFilePath = path.join(dataDir, 'events.json');
const postsFilePath = path.join(dataDir, 'posts.json');

async function migrateData() {
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set. Please set it in .env.local file.');
    process.exit(1);
  }

  console.log('Starting migration from JSON files to MongoDB...');
  
  // Create MongoDB client
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Migrate members
    if (await fs.pathExists(membersFilePath)) {
      const members = await fs.readJSON(membersFilePath);
      if (members.length > 0) {
        // Convert numeric IDs to MongoDB format
        const formattedMembers = members.map(member => {
          const { id, ...rest } = member;
          return rest;
        });
        
        // Insert members
        const membersCollection = db.collection('members');
        const result = await membersCollection.insertMany(formattedMembers);
        console.log(`✅ Migrated ${result.insertedCount} members`);
      } else {
        console.log('No members to migrate');
      }
    } else {
      console.log('Members file not found');
    }
    
    // Migrate events
    if (await fs.pathExists(eventsFilePath)) {
      const events = await fs.readJSON(eventsFilePath);
      if (events.length > 0) {
        // Convert numeric IDs to MongoDB format
        const formattedEvents = events.map(event => {
          const { id, ...rest } = event;
          return rest;
        });
        
        // Insert events
        const eventsCollection = db.collection('events');
        const result = await eventsCollection.insertMany(formattedEvents);
        console.log(`✅ Migrated ${result.insertedCount} events`);
      } else {
        console.log('No events to migrate');
      }
    } else {
      console.log('Events file not found');
    }
    
    // Migrate posts
    if (await fs.pathExists(postsFilePath)) {
      const posts = await fs.readJSON(postsFilePath);
      if (posts.length > 0) {
        // Convert numeric IDs to MongoDB format
        const formattedPosts = posts.map(post => {
          const { id, ...rest } = post;
          return rest;
        });
        
        // Insert posts
        const postsCollection = db.collection('posts');
        const result = await postsCollection.insertMany(formattedPosts);
        console.log(`✅ Migrated ${result.insertedCount} posts`);
      } else {
        console.log('No posts to migrate');
      }
    } else {
      console.log('Posts file not found');
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

migrateData();
