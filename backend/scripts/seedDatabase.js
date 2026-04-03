import pool from '../src/config/database.js';
import axios from 'axios';

// Hardcoded movie data from Data.js
const movieData = {
  'Loki': {
    categories: ['Latest Movies'],
    trailer: 'https://youtu.be/vwSKatRviQo'
  },
  'Arrow': {
    categories: ['Latest Movies', 'Action Movies', 'Dramas', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=0paJCT8umTk'
  },
  'The Flash': {
    categories: ['Latest Movies', 'Action Movies', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=vpCcDK9IjnU'
  },
  'Hawkeye': {
    categories: ['Latest Movies', 'Action Movies'],
    trailer: 'https://www.youtube.com/watch?v=MbhJ5gBtLl0'
  },
  'Doctor Strange': {
    categories: ['Latest Movies', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=NyJBO_3wnB4'
  },
  'Stranger Things': {
    categories: ['Latest Movies', 'Dramas', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=b9ncIleZ9QY'
  },
  'Breaking Bad': {
    categories: ['Dramas'],
    trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY'
  },
  'The Mandalorian': {
    categories: ['Action Movies', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=aOC8E8z_ifw'
  },
  'Westworld': {
    categories: ['Sci-Fi', 'Dramas'],
    trailer: 'https://www.youtube.com/watch?v=eab0atS41FE'
  },
  'Dark': {
    categories: ['Dramas', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/watch?v=rrwycJ08PSA'
  }
};

const fetchMovieFromTVMaze = async (title) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}`);
    const data = response.data;
    
    return {
      title: data.name,
      rating: data.rating?.average || null,
      summary: data.summary || null,
      poster_url: data.image?.medium || null,
      poster_original_url: data.image?.original || null,
      premiere_date: data.premiered || null,
      tvmaze_id: data.id
    };
  } catch (error) {
    console.warn(`⚠️  Could not fetch ${title} from TVMaze: ${error.message}`);
    return null;
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with movies...\n');
    
    // Get all categories
    const [categories] = await pool.query('SELECT * FROM categories');
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    let successCount = 0;
    
    for (const [movieTitle, movieInfo] of Object.entries(movieData)) {
      try {
        // Fetch from TVMaze
        console.log(`📺 Fetching ${movieTitle}...`);
        const tvmazeData = await fetchMovieFromTVMaze(movieTitle);
        
        if (!tvmazeData) {
          console.log(`   ⏭️  Skipped ${movieTitle}`);
          continue;
        }
        
        // Add trailer URL
        tvmazeData.trailer_url = movieInfo.trailer;
        
        // Check if movie already exists
        const [existingRows] = await pool.query('SELECT id FROM movies WHERE tvmaze_id = ?', [tvmazeData.tvmaze_id]);
        
        let movieId;
        if (existingRows.length > 0) {
          movieId = existingRows[0].id;
          console.log(`   ✅ ${movieTitle} already exists`);
        } else {
          // Insert movie
          const [insertResult] = await pool.query(
            `INSERT INTO movies (title, rating, summary, poster_url, poster_original_url, premiere_date, trailer_url, tvmaze_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [tvmazeData.title, tvmazeData.rating, tvmazeData.summary, tvmazeData.poster_url, 
             tvmazeData.poster_original_url, tvmazeData.premiere_date, tvmazeData.trailer_url, tvmazeData.tvmaze_id]
          );
          movieId = insertResult.insertId;
          console.log(`   ✅ Added ${movieTitle}`);
        }
        
        // Add movie to categories
        for (const categoryName of movieInfo.categories) {
          const categoryId = categoryMap[categoryName];
          if (categoryId) {
            await pool.query(
              'INSERT IGNORE INTO movie_categories (movie_id, category_id) VALUES (?, ?)',
              [movieId, categoryId]
            );
          }
        }
        
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error processing ${movieTitle}:`, error.message);
      }
      
      // Rate limiting - be nice to TVMaze API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n✅ Seeding complete! ${successCount} movies added\n`);
    await pool.end();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
