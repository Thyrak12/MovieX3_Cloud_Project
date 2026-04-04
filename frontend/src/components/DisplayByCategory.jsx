import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './Swipe.css';
import { categoriesAPI } from '../services/api';
import MovieCard from './Card';
import StateView from './common/StateView';

function DisplayByCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [categoryName, setCategoryName] = useState('Category');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      try {
        setLoading(true);
        const [categoryResponse, moviesResponse] = await Promise.all([
          categoriesAPI.getById(id),
          categoriesAPI.getMovies(id),
        ]);
        setCategoryName(categoryResponse.data?.name || 'Category');
        setMovies(moviesResponse.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching category movies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryMovies();
    }
  }, [id]);

  if (loading) {
    return <StateView type='loading' message='Loading category...' />;
  }

  if (error) {
    return <StateView type='error' message={`Error: ${error}`} />;
  }

  return (
    <div className='slide-container bg-dark'>
      <button className='button-movie' onClick={() => navigate('/')}>
        {categoryName} ➩
      </button>

      <div className='section-content'>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
          {movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                onClick={() => navigate(`/movie/${movie.id}`)}
                url={movie.poster_url || 'https://via.placeholder.com/300'}
                title={movie.title}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default DisplayByCategory