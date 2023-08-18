import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([]);

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
    try {
      const data = await fetch('http://swapi.py4e.com/api/films/');
      const jsonData = await data.json();

      return setMovieData(jsonData.results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movieData);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieData} />
      </section>
    </React.Fragment>
  );
}

export default App;
