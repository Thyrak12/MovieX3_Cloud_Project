const categories = [
  { id: 1, name: 'Latest Movies' },
  { id: 2, name: 'Action Movies' },
  { id: 3, name: 'Dramas' },
  { id: 4, name: 'Sci-Fi' },
];

const poster = (seed) => `https://picsum.photos/seed/moviex3-${seed}/600/900`;

const movies = [
  {
    id: 1,
    title: 'Loki',
    rating: 8.2,
    summary: 'The god of mischief steps out of his brother\'s shadow and into a new adventure.',
    poster_url: poster('loki'),
    release_year: 2021,
    trailer_url: 'https://www.youtube.com/watch?v=G4JuopziR3Q',
    categories: [categories[0], categories[3]],
  },
  {
    id: 2,
    title: 'Arrow',
    rating: 7.5,
    summary: 'A billionaire playboy becomes a hooded vigilante to clean up his city.',
    poster_url: poster('arrow'),
    release_year: 2012,
    trailer_url: 'https://www.youtube.com/watch?v=H1Fj5XgYxa4',
    categories: [categories[0], categories[1], categories[2], categories[3]],
  },
  {
    id: 3,
    title: 'The Flash',
    rating: 7.9,
    summary: 'A forensic scientist gains super speed and uses it to fight crime.',
    poster_url: poster('flash'),
    release_year: 2014,
    trailer_url: 'https://www.youtube.com/watch?v=Yj0l7iGKh8g',
    categories: [categories[0], categories[1], categories[3]],
  },
  {
    id: 4,
    title: 'Hawkeye',
    rating: 7.4,
    summary: 'A former Avenger teams up with a young archer during the holidays.',
    poster_url: poster('hawkeye'),
    release_year: 2021,
    trailer_url: 'https://www.youtube.com/watch?v=5VYb3B1ETlk',
    categories: [categories[0], categories[1]],
  },
  {
    id: 5,
    title: 'Doctor Strange',
    rating: 7.6,
    summary: 'A brilliant surgeon opens the door to the mystical side of the universe.',
    poster_url: poster('doctor-strange'),
    release_year: 2016,
    trailer_url: 'https://www.youtube.com/watch?v=Lt-U_t2pUHI',
    categories: [categories[0], categories[3]],
  },
  {
    id: 6,
    title: 'Stranger Things',
    rating: 8.7,
    summary: 'A group of kids uncover dark government secrets and supernatural forces.',
    poster_url: poster('stranger-things'),
    release_year: 2016,
    trailer_url: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    categories: [categories[0], categories[2], categories[3]],
  },
  {
    id: 7,
    title: 'Breaking Bad',
    rating: 9.5,
    summary: 'A chemistry teacher turns to manufacturing methamphetamine.',
    poster_url: poster('breaking-bad'),
    release_year: 2008,
    trailer_url: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    categories: [categories[2]],
  },
  {
    id: 8,
    title: 'The Mandalorian',
    rating: 8.5,
    summary: 'A lone bounty hunter travels the outer reaches of the galaxy.',
    poster_url: poster('mandalorian'),
    release_year: 2019,
    trailer_url: 'https://www.youtube.com/watch?v=aOC8E8z_ifw',
    categories: [categories[1], categories[3]],
  },
  {
    id: 9,
    title: 'Westworld',
    rating: 8.1,
    summary: 'In a futuristic theme park, android hosts begin to question reality.',
    poster_url: poster('westworld'),
    release_year: 2016,
    trailer_url: 'https://www.youtube.com/watch?v=I1mOQqvv7qA',
    categories: [categories[2], categories[3]],
  },
  {
    id: 10,
    title: 'Dark',
    rating: 8.8,
    summary: 'A missing child sets four families on a frantic hunt for answers.',
    poster_url: poster('dark'),
    release_year: 2017,
    trailer_url: 'https://www.youtube.com/watch?v=rrwycJ08PSA',
    categories: [categories[2], categories[3]],
  },
];

export const mockData = { categories, movies };

export const getMockCategories = async () => categories;

export const getMockCategoryById = async (id) => categories.find((category) => category.id === Number(id));

export const getMockMovies = async () => movies;

export const getMockMovieById = async (id) => movies.find((movie) => movie.id === Number(id));

export const getMockMoviesByCategory = async (categoryId) => {
  const numericCategoryId = Number(categoryId);
  return movies.filter((movie) => movie.categories.some((category) => category.id === numericCategoryId));
};

export const searchMockMovies = async (query) => {
  const normalized = query.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(normalized) ||
      movie.summary.toLowerCase().includes(normalized)
  );
};
