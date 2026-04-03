-- Movies Table
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  rating DECIMAL(3, 1),
  summary TEXT,
  poster_url VARCHAR(500),
  poster_original_url VARCHAR(500),
  premiere_date DATE,
  trailer_url VARCHAR(500),
  tvmaze_id INT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_movies_title (title),
  INDEX idx_movies_rating (rating)
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Movie Categories Junction Table (many-to-many)
CREATE TABLE IF NOT EXISTS movie_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY uq_movie_category (movie_id, category_id),
  INDEX idx_movie_categories_movie_id (movie_id),
  INDEX idx_movie_categories_category_id (category_id)
);
