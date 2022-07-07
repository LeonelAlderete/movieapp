//constantes
import {
  API_HOST,
  API_KEY,
  SEARCH_MOVIE_URL,
  LANG,
} from '../../../utils/constants/constants';
const axios = require('axios').default;

export default function searchMovieAPI(searchValue) {
  try {
    const res = axios.get(`${API_HOST}${SEARCH_MOVIE_URL}`, {
      params: {
        api_key: API_KEY,
        language: LANG,
        query: searchValue,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
