import { useEffect, useState } from 'react';
import { categoriesAPI } from '../services/api';
import { moviesAPI } from '../services/api';
import Home from '../components/Home';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getAll();
        const categoryList = response.data || [];
        setCategories(categoryList);

        const sectionResults = await Promise.all(
          categoryList.map(async (category) => {
            try {
              const moviesResponse = await moviesAPI.getByCategory(category.id);
              return { id: category.id, movies: moviesResponse.data || [], loading: false, error: null };
            } catch (movieError) {
              console.error(`Error fetching movies for category ${category.id}:`, movieError);
              return { id: category.id, movies: [], loading: false, error: 'Failed to load movies' };
            }
          })
        );

        setSections(sectionResults);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return <Home categories={categories} loading={loading} error={error} sections={sections} />;
};

export default HomePage;