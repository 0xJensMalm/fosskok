import fs from 'fs';
import path from 'path';
import { dataFilePaths } from '@/src/config';
import { Member, Event, Post, User, ApiResponse } from '@/src/types/models';

// Type for collection names
type CollectionName = keyof typeof dataFilePaths;

// Helper function to read data from JSON files
export async function getCollection(collectionName: CollectionName) {
  return {
    find: () => ({
      sort: () => ({
        toArray: async <T>(): Promise<T[]> => {
          try {
            const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
            if (fs.existsSync(filePath)) {
              const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              return data as T[];
            }
            return [] as T[];
          } catch (error) {
            console.error(`Error reading data for ${collectionName}:`, error);
            return [] as T[];
          }
        }
      })
    }),
    findOne: async <T>(query: Partial<T>): Promise<T | null> => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return data.find((item: T) => 
            Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T])
          ) as T || null;
        }
        return null;
      } catch (error) {
        console.error(`Error reading data for ${collectionName}:`, error);
        return null;
      }
    },
    insertOne: async <T extends { id?: number }>(newItem: T): Promise<{ success: boolean; insertedId?: number; error?: string }> => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        let data: T[] = [];
        
        if (fs.existsSync(filePath)) {
          data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        
        // Generate a new ID
        const newId = data.length > 0 ? Math.max(...data.map((item: T) => item.id || 0)) + 1 : 1;
        const itemWithId = { ...newItem, id: newId };
        
        // Add to data array
        data.push(itemWithId as T);
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        return { success: true, insertedId: newId };
      } catch (error) {
        console.error(`Error inserting data into ${collectionName}:`, error);
        return { success: false, error: String(error) };
      }
    },
    updateOne: async <T extends { id: number }>(
      query: Partial<T>, 
      update: Partial<T>
    ): Promise<{ success: boolean; modifiedCount: number; error?: string }> => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        
        if (!fs.existsSync(filePath)) {
          return { success: false, modifiedCount: 0, error: 'Collection does not exist' };
        }
        
        const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Find the item to update
        const index = data.findIndex((item: T) => 
          Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T])
        );
        
        if (index === -1) {
          return { success: false, modifiedCount: 0, error: 'Item not found' };
        }
        
        // Update the item
        data[index] = { ...data[index], ...update };
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        return { success: true, modifiedCount: 1 };
      } catch (error) {
        console.error(`Error updating data in ${collectionName}:`, error);
        return { success: false, modifiedCount: 0, error: String(error) };
      }
    },
    deleteOne: async <T>(query: Partial<T>): Promise<{ success: boolean; deletedCount: number; error?: string }> => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        
        if (!fs.existsSync(filePath)) {
          return { success: false, deletedCount: 0, error: 'Collection does not exist' };
        }
        
        const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Find the item to delete
        const index = data.findIndex((item: T) => 
          Object.keys(query).every(key => item[key as keyof T] === query[key as keyof T])
        );
        
        if (index === -1) {
          return { success: false, deletedCount: 0, error: 'Item not found' };
        }
        
        // Remove the item
        data.splice(index, 1);
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        return { success: true, deletedCount: 1 };
      } catch (error) {
        console.error(`Error deleting data from ${collectionName}:`, error);
        return { success: false, deletedCount: 0, error: String(error) };
      }
    }
  };
}
