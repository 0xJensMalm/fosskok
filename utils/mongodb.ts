import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection URL
const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'fosskok';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Cache the client connection to reuse it across requests
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

// Helper function to get the database
export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to get a collection
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

export default clientPromise;
