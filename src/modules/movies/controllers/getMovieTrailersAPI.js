//constantes
import {API_KEY, API_HOST, LANG} from '../../../utils/constants/constants';
//Utils
const axios = require('axios').default;

export default function getMovieTrailersAPI(movieID) {
  try {
    /* const res = axios.get(`${API_HOST}/movie/${movieID}/videos?`, {
      params: {
        api_key: API_KEY,
        language: LANG,
      },
    });

    console.log('getMovieTrailersAPI - success');

    return res; */

    const url = `${API_HOST}/movie/${movieID}/videos?api_key=${API_KEY}&language=${LANG}`;

    console.log('getMovieTrailersAPI - success');

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      });
  } catch (error) {
    console.log(error);
  }
}
