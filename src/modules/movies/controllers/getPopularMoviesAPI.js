//constantes
import {
  API_KEY,
  API_HOST,
  POPULAR_MOVIES_URL,
  LANG,
} from '../../../utils/constants/constants';
//Utils
const axios = require('axios').default;

export default function getPopularMoviesAPI(page) {
  try {
    const res = axios.get(`${API_HOST}${POPULAR_MOVIES_URL}`, {
      params: {
        api_key: API_KEY,
        language: LANG,
        page: page,
      },
    });

    console.log('getPopularMoviesAPI - success');

    return res;
  } catch (error) {
    console.log(error);
  }
}
