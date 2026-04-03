import Carousel from './Carousel';
import Slide from './Slider';
import StateView from './common/StateView';

function Home({ categories = [], loading = false, error = null, sections = [] }) {

  return (
    <>
      <Carousel />
      {loading ? (
        <StateView type='loading' message='Loading categories...' />
      ) : error ? (
        <StateView type='error' message={error} />
      ) : categories.length === 0 ? (
        <StateView type='empty' message='No categories found' />
      ) : (
        categories.map((category) => (
          <Slide
            key={category.id}
            categoryData={category}
            movies={sections.find((section) => section.id === category.id)?.movies || []}
            loading={sections.find((section) => section.id === category.id)?.loading || false}
            error={sections.find((section) => section.id === category.id)?.error || null}
          />
        ))
      )}
    </>
  );
}

export default Home;