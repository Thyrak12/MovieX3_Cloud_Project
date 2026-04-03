import pool from './database.js';

export let databaseAvailable = false;

export const detectDatabaseAvailability = async () => {
  try {
    await pool.query('SELECT 1');
    databaseAvailable = true;
    console.log('🗄️  MySQL available - using database mode');
  } catch (error) {
    databaseAvailable = false;
    console.log('🧪 MySQL unavailable - using mock data mode');
  }

  return databaseAvailable;
};

export const markDatabaseUnavailable = () => {
  databaseAvailable = false;
};
