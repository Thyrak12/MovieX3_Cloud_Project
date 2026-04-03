import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './Swipe.css';
import MovieCard from './Card';
import StateView from './common/StateView';

const CustomMovies = ({ categoryData, movies = [], loading = false, error = null }) => {
  const navigate = useNavigate();
  const categoryId = categoryData?.id;
  const categoryName = categoryData?.name || categoryData?.id;

  if (error) {
    return <StateView type='error' message={`Failed to load movies: ${error}`} />;
  }

  return (
    <div className='slide-container bg-dark'>
      <button className='button-movie' onClick={() => navigate(`/category/${categoryId}`)}>
        {categoryName} ➩
      </button>

      <div className='section-content'>
        {loading ? (
          <StateView type='loading' message='Loading movies...' />
        ) : error ? (
          <StateView type='error' message={error} />
        ) : movies.length === 0 ? (
          <StateView type='empty' message='No movies found' />
        ) : (
          <Swiper
            className='movies-swiper'
            style={{ "--swiper-navigation-size": "30px" }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
            spaceBetween={-10}
            slidesPerView={6}
            navigation
            mousewheel
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1440: { slidesPerView: 6 },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  url={movie.poster_url || 'https://via.placeholder.com/300'}
                  title={movie.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default CustomMovies;
