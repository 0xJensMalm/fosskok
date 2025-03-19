#!/usr/bin/env node

/**
 * This script checks if the required environment variables are set
 * It's meant to be run during the build process
 */

// List of environment variables to check
const requiredEnvVars = [
  // Admin credentials
  { name: 'ADMIN_USERNAME', defaultValue: 'admin', isSecret: false },
  { name: 'ADMIN_PASSWORD', defaultValue: 'fosskok2025', isSecret: true },
  
  // Site configuration
  { name: 'NEXT_PUBLIC_SITE_URL', defaultValue: 'https://fosskok.no', isSecret: false },
];

// Check each variable
let missingVars = false;

console.log('\n🔍 Checking environment variables...\n');

requiredEnvVars.forEach(({ name, defaultValue, isSecret }) => {
  const value = process.env[name];
  
  if (!value) {
    if (defaultValue) {
      console.log(`⚠️  ${name} is not set. Using default value.`);
      process.env[name] = defaultValue;
    } else {
      console.error(`❌ ${name} is required but not set!`);
      missingVars = true;
    }
  } else {
    const displayValue = isSecret ? '********' : value;
    console.log(`✅ ${name} is set to: ${displayValue}`);
  }
});

if (missingVars) {
  console.error('\n❌ Some required environment variables are missing. Exiting...\n');
  process.exit(1);
} else {
  console.log('\n✅ All environment variables are set!\n');
}
