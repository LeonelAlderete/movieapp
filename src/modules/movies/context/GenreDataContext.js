import React, {createContext} from 'react';
//Hooks
import useGenreData from '../hooks/useGenreData';

export const GenreDataContext = createContext();

export default function GenreDataProvider({children}) {
  const {allGenres, selectedGenre, setSelectedGenre, setMovieGenre} =
    useGenreData();
  return (
    <GenreDataContext.Provider
      value={{allGenres, selectedGenre, setSelectedGenre, setMovieGenre}}>
      {children}
    </GenreDataContext.Provider>
  );
}
