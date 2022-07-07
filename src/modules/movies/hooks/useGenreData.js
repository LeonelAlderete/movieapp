import {useState, useEffect} from 'react';
//Controladores
import getAllGenresAPI from '../controllers/getAllGenresAPI';

export default function useGenreData() {
  //Utils
  const [allGenres, setAllGenres] = useState(null); // Generos disponibles para busacar|renderizar peliculas
  const [selectedGenre, setSelectedGenre] = useState(28);

  //Obtener generos de peliculas
  useEffect(() => {
    const onStart = async () => {
      const res = await getAllGenresAPI();

      setAllGenres(res);
    };

    onStart();
  }, []);

  const setMovieGenre = genresIDs => {
    const genresName = [];

    genresIDs.forEach(id => {
      allGenres.forEach(genre => {
        if (genre.id === id) genresName.push(genre.name);
      });
    });

    return genresName;
  };

  return {allGenres, selectedGenre, setSelectedGenre, setMovieGenre};
}
