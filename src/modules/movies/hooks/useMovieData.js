import {useState, useEffect, useContext} from 'react';
//Context
import {GenreDataContext} from '../context/GenreDataContext';
//Controladores
import getPopularMoviesAPI from '../controllers/getPopularMoviesAPI';
import getRecommendedMovies from '../controllers/getRecommendedMovies';
import getNewsMovieAPI from '../controllers/getNewsMoviesAPI';
import getMovieDataAPI from '../controllers/getMovieDataAPI';
import getMovieTrailersAPI from '../controllers/getMovieTrailersAPI';
import searchMovieAPI from '../controllers/searchMovieAPI';

export default function useMovieData() {
  //Context
  const {allGenres, selectedGenre} = useContext(GenreDataContext);
  //Datos de pelicula seleccionada
  const [movieData, setMovieData] = useState(undefined);
  const [movieTrailer, setMovieTrailer] = useState(undefined); //url del trailer
  //Lista de peliculas
  const [popularMoviesList, setPopularMoviesList] = useState(undefined);
  const [newsMoviesList, setNewsMoviesList] = useState(undefined);
  const [recommendedMovies, setRecommendedMovies] = useState(undefined); //Lista de la categoria seleccionada en HOME
  const [searchResult, setSearchResult] = useState(undefined);
  //Utils
  const [page, setPage] = useState({popularMovies: 2, newsMovies: 2}); //Cantidad de paginas obtenidas desde la API
  const [disableButton, setDisabledButton] = useState(false);
  const [showMoreMoviesButton, setShowMoreMoviesButton] = useState(false);

  // Obtener Peliculas populares
  useEffect(() => {
    const onStart = async () => {
      const res = await getPopularMoviesAPI(1);
      setPopularMoviesList(res.data.results);

      res.data.total_pages > 1 && setShowMoreMoviesButton(true);
    };

    onStart();
  }, []);

  // Obtener Peliculas nuevas
  useEffect(() => {
    const onStart = async () => {
      const res = await getNewsMovieAPI(1);
      setNewsMoviesList(res.data.results);

      res.data.total_pages > 1 && setShowMoreMoviesButton(true);
    };

    onStart();
  }, []);

  //Obtener peliculas del genero seleccionado
  useEffect(() => {
    const onStart = async () => {
      const res = await getRecommendedMovies(selectedGenre);
      setRecommendedMovies(res.data.results);
    };

    onStart();
  }, [selectedGenre]);

  const setMovieGenre = genresIDs => {
    const genresName = [];

    genresIDs.forEach(id => {
      allGenres.forEach(genre => {
        if (genre.id === id) genresName.push(genre.name);
      });
    });

    return genresName;
  };

  const getMovieData = async movieID => {
    setDisabledButton(true);

    const res = await getMovieDataAPI(movieID);

    setMovieData(res.data);

    setDisabledButton(false);
  };

  const getMovieTrailers = async movieID => {
    setDisabledButton(true);

    const res = await getMovieTrailersAPI(movieID);

    //Crear URL al trailer
    let idVideo = undefined;
    res.results.forEach(video => {
      if (video.site === 'YouTube' && !idVideo) {
        idVideo = video.key;
      }
    });

    const url = `https://www.youtube.com/embed/${idVideo}?controls=0&showinfo=0`;

    setMovieTrailer(url);

    setDisabledButton(false);
  };

  const getPopularMovies = async () => {
    setDisabledButton(true);

    const res = await getPopularMoviesAPI(page.popularMovies);

    setPopularMoviesList(popularMoviesList.concat(res.data.results));

    res.data.total_pages <= page.popularMovies &&
      setShowMoreMoviesButton(false);

    setDisabledButton(false);
  };

  const getNewsMovies = async () => {
    setDisabledButton(true);

    const res = await getNewsMovieAPI(page.newsMovies);

    setNewsMoviesList(newsMoviesList.concat(res.data.results));

    res.data.total_pages <= page.newsMovies && setShowMoreMoviesButton(false);

    setDisabledButton(false);
  };

  const searchMovie = async searchValue => {
    setDisabledButton(true);

    const res = await searchMovieAPI(searchValue);

    setSearchResult(res.data.results);

    setDisabledButton(false);
  };

  return {
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
  };
}
