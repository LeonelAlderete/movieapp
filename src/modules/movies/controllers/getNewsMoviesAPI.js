//Constantes
import {
  API_KEY,
  API_HOST,
  UPCOMING_MOVIES_URL,
  LANG,
} from '../../../utils/constants/constants';
//Utils
const axios = require('axios').default;

export default function getNewsMoviesAPI(page) {
  try {
    const res = axios.get(`${API_HOST}${UPCOMING_MOVIES_URL}`, {
      params: {
        api_key: API_KEY,
        language: LANG,
        page: page,
      },
    });

    console.log('getNewsMoviesAPI - success');

    return res;
  } catch (error) {
    console.log(error);
  }
}
