// This script helps set up your environment variables
const fs = require('fs');
const path = require('path');

// Create .env.local file with basic configuration
const envContent = `# Environment variables for Fosskok Next.js application
NODE_ENV=development

# Add any other environment variables here as needed
`;

const envPath = path.join(__dirname, '.env.local');

// Write the file
fs.writeFileSync(envPath, envContent);

console.log('\x1b[32m%s\x1b[0m', '✅ Created .env.local file');
console.log('\x1b[36m%s\x1b[0m', '📝 Run your application with: npm run dev');
