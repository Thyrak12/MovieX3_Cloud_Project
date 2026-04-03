import pool from '../config/database.js';
import { databaseAvailable, markDatabaseUnavailable } from '../config/dbStatus.js';
import {
  getMockMovies,
  getMockMovieById,
  getMockMoviesByCategory,
  searchMockMovies,
} from '../data/mockData.js';

const mapMovieRows = (rows) => {
  const map = new Map();

  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        title: row.title,
        rating: row.rating,
        summary: row.summary,
        poster_url: row.poster_url,
        poster_original_url: row.poster_original_url,
        premiere_date: row.premiere_date,
        trailer_url: row.trailer_url,
        tvmaze_id: row.tvmaze_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        categories: [],
      });
    }

    if (row.category_id) {
      map.get(row.id).categories.push({ id: row.category_id, name: row.category_name });
    }
  }

  return Array.from(map.values());
};

export const getAllMovies = async () => {
  if (!databaseAvailable) {
    return getMockMovies();
  }

  const query = `
    SELECT m.*, c.id AS category_id, c.name AS category_name
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    ORDER BY m.created_at DESC
  `;

  try {
    const [rows] = await pool.query(query);
    return mapMovieRows(rows);
  } catch (error) {
    markDatabaseUnavailable();
    return getMockMovies();
  }
};

export const getMovieById = async (id) => {
  if (!databaseAvailable) {
    return getMockMovieById(id);
  }

  const query = `
    SELECT m.*, c.id AS category_id, c.name AS category_name
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    WHERE m.id = ?
  `;

  try {
    const [rows] = await pool.query(query, [id]);
    return mapMovieRows(rows)[0];
  } catch (error) {
    markDatabaseUnavailable();
    return getMockMovieById(id);
  }
};

export const searchMovies = async (query) => {
  if (!databaseAvailable) {
    return searchMockMovies(query);
  }

  const sql = `
    SELECT m.*, c.id AS category_id, c.name AS category_name
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    WHERE m.title LIKE ? OR m.summary LIKE ?
    ORDER BY m.rating DESC
    LIMIT 20
  `;

  try {
    const searchQuery = `%${query}%`;
    const [rows] = await pool.query(sql, [searchQuery, searchQuery]);
    return mapMovieRows(rows);
  } catch (error) {
    markDatabaseUnavailable();
    return searchMockMovies(query);
  }
};

export const getMoviesByCategory = async (categoryId) => {
  if (!databaseAvailable) {
    return getMockMoviesByCategory(categoryId);
  }

  const query = `
    SELECT m.*, c.id AS category_id, c.name AS category_name
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    WHERE mc.category_id = ?
    ORDER BY m.rating DESC
  `;

  try {
    const [rows] = await pool.query(query, [categoryId]);
    return mapMovieRows(rows);
  } catch (error) {
    markDatabaseUnavailable();
    return getMockMoviesByCategory(categoryId);
  }
};

export const addMovie = async (movieData) => {
  const { title, rating, summary, poster_url, poster_original_url, premiere_date, trailer_url, tvmaze_id } = movieData;

  if (!databaseAvailable) {
    return {
      id: tvmaze_id || Date.now(),
      title,
      rating,
      summary,
      poster_url,
      poster_original_url,
      premiere_date,
      trailer_url,
      tvmaze_id,
      categories: [],
    };
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO movies (title, rating, summary, poster_url, poster_original_url, premiere_date, trailer_url, tvmaze_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, rating, summary, poster_url, poster_original_url, premiere_date, trailer_url, tvmaze_id]
    );
    return getMovieById(result.insertId);
  } catch (error) {
    markDatabaseUnavailable();
    return {
      id: tvmaze_id || Date.now(),
      title,
      rating,
      summary,
      poster_url,
      poster_original_url,
      premiere_date,
      trailer_url,
      tvmaze_id,
      categories: [],
    };
  }
};

export const addMovieToCategory = async (movieId, categoryId) => {
  if (!databaseAvailable) {
    return null;
  }

  try {
    await pool.query('INSERT IGNORE INTO movie_categories (movie_id, category_id) VALUES (?, ?)', [movieId, categoryId]);
    return { movie_id: movieId, category_id: categoryId };
  } catch (error) {
    markDatabaseUnavailable();
    return null;
  }
};
