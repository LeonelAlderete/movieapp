import React, {createContext} from 'react';
//hooks
import useMovieData from '../hooks/useMovieData';

export const MovieDataContext = createContext();

export default function MovieDataProvider({children}) {
  const {
    disableButton,
    showMoreMoviesButton,
    page,
    setPage,
    movieData,
    movieTrailer,
    recommendedMovies,
    newsMoviesList,
    searchResult,
    popularMoviesList,
    setMovieGenre,
    getMovieData,
    getMovieTrailers,
    getPopularMovies,
    getNewsMovies,
    searchMovie,
  } = useMovieData();
  return (
    <MovieDataContext.Provider
      value={{
        disableButton,
        showMoreMoviesButton,
        page,
        setPage,
        movieData,
        movieTrailer,
        recommendedMovies,
        newsMoviesList,
        searchResult,
        popularMoviesList,
        setMovieGenre,
        getMovieData,
        getMovieTrailers,
        getPopularMovies,
        getNewsMovies,
        searchMovie,
      }}>
      {children}
    </MovieDataContext.Provider>
  );
}
