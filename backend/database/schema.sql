-- Movies Table
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  rating DECIMAL(3, 1),
  summary TEXT,
  poster_url VARCHAR(500),
  trailer_url VARCHAR(500),
  release_year INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Movie Categories Junction Table (many-to-many)
CREATE TABLE IF NOT EXISTS movie_categories (
  movie_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (movie_id, category_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
