import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// Movies API
export const moviesAPI = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  search: (query) => api.get('/movies/search', { params: { q: query } }),
  getByCategory: (categoryId) => api.get(`/movies/category/${categoryId}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  getMovies: (categoryId) => api.get(`/categories/${categoryId}/movies`),
};

export default api;
