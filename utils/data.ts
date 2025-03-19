import fs from 'fs';
import path from 'path';

// Helper function to read data from JSON files
export async function getCollection(collectionName: string) {
  return {
    find: () => ({
      sort: () => ({
        toArray: async () => {
          try {
            const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
            if (fs.existsSync(filePath)) {
              const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              return data;
            }
            return [];
          } catch (error) {
            console.error(`Error reading data for ${collectionName}:`, error);
            return [];
          }
        }
      })
    }),
    findOne: async (query: any) => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return data.find((item: any) => 
            Object.keys(query).every(key => item[key] === query[key])
          );
        }
        return null;
      } catch (error) {
        console.error(`Error reading data for ${collectionName}:`, error);
        return null;
      }
    },
    insertOne: async (newItem: any) => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        let data = [];
        
        if (fs.existsSync(filePath)) {
          data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        
        // Generate a new ID
        const newId = data.length > 0 ? Math.max(...data.map((item: any) => item.id || 0)) + 1 : 1;
        const itemWithId = { ...newItem, id: newId };
        
        // Add to array
        data.push(itemWithId);
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        return { insertedId: newId };
      } catch (error) {
        console.error(`Error inserting data for ${collectionName}:`, error);
        return { insertedId: null };
      }
    },
    updateOne: async (query: any, update: any) => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        if (!fs.existsSync(filePath)) {
          return { matchedCount: 0 };
        }
        
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let matchedCount = 0;
        
        // Find the item to update
        const updatedData = data.map((item: any) => {
          if (Object.keys(query).every(key => item[key] === query[key])) {
            matchedCount++;
            return { ...item, ...update.$set };
          }
          return item;
        });
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        
        return { matchedCount };
      } catch (error) {
        console.error(`Error updating data for ${collectionName}:`, error);
        return { matchedCount: 0 };
      }
    },
    deleteOne: async (query: any) => {
      try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        if (!fs.existsSync(filePath)) {
          return { deletedCount: 0 };
        }
        
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const initialLength = data.length;
        
        // Filter out the item to delete
        const filteredData = data.filter((item: any) => 
          !Object.keys(query).every(key => {
            // Handle the special case for ObjectId
            if (key === '_id' && query[key].toString) {
              return query[key].toString() === item.id.toString();
            }
            return item[key] === query[key];
          })
        );
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));
        
        return { deletedCount: initialLength - filteredData.length };
      } catch (error) {
        console.error(`Error deleting data for ${collectionName}:`, error);
        return { deletedCount: 0 };
      }
    }
  };
}
