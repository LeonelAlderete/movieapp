//constantes
import {API_KEY, API_HOST, LANG} from '../../../utils/constants/constants';

export default function getMovieTrailersAPI(movieID) {
  try {
    const url = `${API_HOST}/movie/${movieID}/videos?api_key=${API_KEY}&language=${LANG}`;

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
