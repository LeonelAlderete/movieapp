//constantes
import {API_KEY, API_HOST, LANG} from '../../../utils/constants/constants';
//Utils
const axios = require('axios').default;

export default function getMovieDataAPI(movieID) {
  try {
    const res = axios.get(`${API_HOST}/movie/${movieID}`, {
      params: {
        api_key: API_KEY,
        language: LANG,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
