import pool from '../config/database.js';
import { databaseAvailable, markDatabaseUnavailable } from '../config/dbStatus.js';
import { getMockCategories, getMockCategoryById } from '../data/mockData.js';

export const getAllCategories = async () => {
  if (!databaseAvailable) {
    return getMockCategories();
  }

  const query = 'SELECT * FROM categories ORDER BY name';

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    markDatabaseUnavailable();
    return getMockCategories();
  }
};

export const getCategoryById = async (id) => {
  if (!databaseAvailable) {
    return getMockCategoryById(id);
  }

  const query = 'SELECT * FROM categories WHERE id = $1';

  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    markDatabaseUnavailable();
    return getMockCategoryById(id);
  }
};

export const getCategoryByName = async (name) => {
  if (!databaseAvailable) {
    return (await getMockCategories()).find((category) => category.name === name);
  }

  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE name = ?', [name]);
    return rows[0];
  } catch (error) {
    markDatabaseUnavailable();
    return (await getMockCategories()).find((category) => category.name === name);
  }
};
