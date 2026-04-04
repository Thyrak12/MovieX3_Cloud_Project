import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Movie.css';
import { moviesAPI } from '../services/api';
import StateView from './common/StateView';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await moviesAPI.getById(id);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  const removeHTMLTags = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (loading) {
    return <StateView type='loading' message='Loading movie...' />;
  }

  if (error) {
    return <StateView type='error' message={`Error: ${error}`} />;
  }

  if (!movie) {
    return <StateView type='empty' message='Movie not found' />;
  }

  return (
    <div className='bg-dark'>
      <div className='Card-container'>
        <div className='Card-Picture'>
          <div className='Box1'>
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className='Box2'>
            {movie.trailer_url ? (
              <ReactPlayer 
                url={movie.trailer_url} 
                width='100%' 
                height='100%'
                controls
              />
            ) : (
              <div className='text-center text-light py-5'>No trailer available</div>
            )}
          </div>
        </div>

        <div className='Card-Info'>
          <h3>{movie.title}</h3>
          <h5>Release Year: {movie.release_year || 'N/A'}</h5>
          <h5>Rating: {movie.rating || 'N/A'}</h5>
          <hr />
          <h5>Summary:</h5>
          <p>{removeHTMLTags(movie.summary)}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
