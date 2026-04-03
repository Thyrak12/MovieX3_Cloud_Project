import express from 'express';
import * as movieController from '../controllers/movieController.js';

const router = express.Router();

// GET all movies
router.get('/', movieController.getMovies);

// Search movies
router.get('/search', movieController.searchMovies);

// GET movies by category
router.get('/category/:categoryId', movieController.getMoviesByCategory);

// GET movie by ID
router.get('/:id', movieController.getMovieById);

export default router;
