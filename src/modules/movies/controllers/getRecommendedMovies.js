//constantes
import {
  API_KEY,
  API_HOST,
  DISCOVER_MOVIE_URL,
  LANG,
} from '../../../utils/constants/constants';
//Utils
const axios = require('axios').default;

export default function getRecommendedMovies(genreID) {
  try {
    const res = axios.get(`${API_HOST}${DISCOVER_MOVIE_URL}`, {
      params: {
        api_key: API_KEY,
        with_genres: genreID,
        language: LANG,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
