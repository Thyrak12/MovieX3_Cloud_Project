import pool from '../src/config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    
    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema
    await pool.query(schema);
    
    console.log('✅ Database initialized successfully');
    
    // Insert default categories
    const categories = ['Latest Movies', 'Action Movies', 'Dramas', 'Sci-Fi'];
    const [existingRows] = await pool.query('SELECT name FROM categories');
    const existingNames = new Set(existingRows.map((row) => row.name));

    for (const category of categories) {
      if (!existingNames.has(category)) {
        await pool.query('INSERT INTO categories (name) VALUES (?)', [category]);
      }
    }
    
    console.log('✅ Categories inserted');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initDatabase();
