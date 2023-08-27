// scripts/generateSupabaseTypes.ts
import { exec } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseDatabasePassword = process.env.SUPABASE_DB_PASSWORD;

if (!supabaseUrl || !supabaseDatabasePassword) {
  console.error('Environment variables are missing.');
  process.exit(1);
}

const databaseUrl = `postgresql://postgres:${supabaseDatabasePassword}@db.${supabaseUrl.replace(
  'https://',
  '',
)}:5432/postgres`;

// Generate types
exec(
  `supabase gen types typescript --db-url ${databaseUrl}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating types: ${error}`);
      return;
    }

    // Save the generated types to a file
    const filePath = path.resolve(__dirname, '../types/database.ts');
    fs.writeFile(filePath, stdout, (err) => {
      if (err) {
        console.error(`Error saving types to file: ${err}`);
        return;
      }
      console.log(`Types have been saved to ${filePath}`);
    });

    console.error(`stderr: ${stderr}`);
  },
);
