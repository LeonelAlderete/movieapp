import {
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import React, {useContext} from 'react';
//ui
import styles from './newmovies-styles';
import {Layout, Text, Button} from '@ui-kitten/components';
//Contexto
import {MovieDataContext} from '../../context/MovieDataContext';
//Utils
import {map} from 'lodash';
//Constantes
import {
  BASE_PATH_IMG,
  MOVIE_DATA_PATH,
} from '../../../../utils/constants/constants';
const {height} = Dimensions.get('window');

export default function NewMovies(props) {
  const {navigation} = props;
  const {
    page,
    setPage,
    disableButton,
    showMoreMoviesButton,
    newsMoviesList,
    getNewsMovies,
    getMovieData,
  } = useContext(MovieDataContext);

  const onClickMoreMovies = () => {
    getNewsMovies();

    setPage({...page, newsMovies: page.newsMovies + 1});
  };

  return (
    <ScrollView>
      <Layout style={{minHeight: height}}>
        {/* Lista de peliculas */}
        <View style={styles.container}>
          {map(newsMoviesList, (item, index) => (
            <Movies
              key={index}
              movieData={item}
              navigation={navigation}
              getMovieData={getMovieData}
            />
          ))}
        </View>

        {/* Boton mas peliculas */}
        {showMoreMoviesButton && (
          <Button onPress={() => onClickMoreMovies()} disabled={disableButton}>
            Cargar mas
          </Button>
        )}
      </Layout>
    </ScrollView>
  );
}

const Movies = props => {
  const {movieData, getMovieData, navigation} = props;
  const {id, title, poster_path} = movieData;

  const onClickMovie = () => {
    getMovieData(id);

    navigation.navigate(MOVIE_DATA_PATH, {movieID: id});
  };

  return (
    <TouchableHighlight onPress={() => onClickMovie()}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableHighlight>
  );
};
