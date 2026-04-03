import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import * as movieController from '../controllers/movieController.js';

const router = express.Router();

// GET all categories
router.get('/', categoryController.getCategories);

// GET movies in a category
router.get('/:id/movies', movieController.getMoviesByCategory);

// GET category by ID
router.get('/:id', categoryController.getCategoryById);

export default router;
