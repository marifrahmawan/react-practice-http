import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   try {
  //     const fetcData = async () => {
  //       const data = await fetch('http://swapi.py4e.com/api/films/');
  //       const jsonData = await data.json();

  //       return setMovieData(jsonData.results);
  //     };

  //     fetcData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const fetchMovie = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('http://swapi.py4e.com/api/films/');

      if (response.status !== 200) {
        throw new Error('Something went wrong !');
      }

      const jsonData = await response.json();
      setMovieData(jsonData.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  console.log(movieData);

  return (
    <React.Fragment>
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
