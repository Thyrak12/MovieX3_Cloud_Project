import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movies.js';
import categoryRoutes from './routes/categories.js';
import errorHandler from './middleware/errorHandler.js';
import { detectDatabaseAvailability, databaseAvailable } from './config/dbStatus.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Backend is running' });
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  await detectDatabaseAvailability();

  app.listen(PORT, () => {
    console.log(`\n🎬 MovieX3 Backend running on http://localhost:${PORT}`);
    console.log(`📡 Frontend CORS allowed: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🧭 Data mode: ${databaseAvailable ? 'database' : 'mock data'}\n`);
  });
};

startServer();
