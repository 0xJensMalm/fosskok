// This script helps set up your environment variables
const fs = require('fs');
const path = require('path');

// Create .env.local file with MongoDB connection info
const envContent = `MONGODB_URI=mongodb+srv://jensmalm:<db_password>@fosskok.swvxv.mongodb.net/?retryWrites=true&w=majority&appName=Fosskok
MONGODB_DB=fosskok

# Replace <db_password> with your actual MongoDB password
# Then run your application with: npm run dev
`;

const envPath = path.join(__dirname, '.env.local');

// Write the file
fs.writeFileSync(envPath, envContent);

console.log('\x1b[32m%s\x1b[0m', '✅ Created .env.local file');
console.log('\x1b[33m%s\x1b[0m', '⚠️  Important: Edit .env.local to replace <db_password> with your actual MongoDB password');
console.log('\x1b[36m%s\x1b[0m', '📝 Then run your application with: npm run dev');
