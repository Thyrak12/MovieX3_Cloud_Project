import * as MovieModel from '../models/Movie.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.getAllMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.getMovieById(id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const movies = await MovieModel.searchMovies(q.trim());
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMoviesByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId || req.params.id;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const movies = await MovieModel.getMoviesByCategory(categoryId);
    res.json(movies);
  } catch (error) {
    next(error);
  }
};
