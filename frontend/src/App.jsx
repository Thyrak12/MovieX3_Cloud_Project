import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import DisplaySearch from './components/DisplaySearch';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import CategoryPage from './pages/CategoryPage';

function App() {
  const [movies, setMovies] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      <Header
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setMovies={setMovies}
      />
      <Routes>
        <Route path="/" element={!isSearch ? <HomePage /> : <DisplaySearch movies={movies} />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
