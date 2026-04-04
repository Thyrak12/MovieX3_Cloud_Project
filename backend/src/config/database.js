import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.Database_Production_Host || process.env.DB_HOST || 'localhost',
  port: Number(process.env.Database_Production_Port || process.env.DB_PORT || 3306),
  database: process.env.Database_Production_Name || process.env.DB_NAME || 'movie_x3',
  user: process.env.Database_Production_User || process.env.DB_USER || 'root',
  password: process.env.Database_Production_Password || process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

export default pool;
