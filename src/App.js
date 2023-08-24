import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetchMovie();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchMovie = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong !');
      }

      const jsonData = await response.json();

      const loadedMovies = [];

      for (const key in jsonData) {
        loadedMovies.push({
          id: key,
          title: jsonData[key].title,
          openingText: jsonData[key].openingText,
          releaseDate: jsonData[key].releaseDate,
        });
      }

      setMovieData(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong !');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movieData.length > 0 && <MoviesList movies={movieData} />}
        {!isLoading && !error && movieData.length === 0 && <p>Found no Movies</p>}
        {isLoading && <p>Loading . . .</p>}
        {error && !isLoading && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
