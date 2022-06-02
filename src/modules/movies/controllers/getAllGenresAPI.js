//Utils
const axios = require('axios').default;
//Constantes
import {
  API_HOST,
  API_KEY,
  ALL_GENRES_URL,
  LANG,
} from '../../../utils/constants/constants';

const getAllGenresAPI = async () => {
  try {
    const allGenres = await axios.get(`${API_HOST}${ALL_GENRES_URL}`, {
      params: {
        api_key: API_KEY,
        language: LANG,
      },
    });

    console.log('getAllGenresAPI - success');

    return allGenres.data.genres;
  } catch (error) {
    console.log(error);
  }
};

export default getAllGenresAPI;
