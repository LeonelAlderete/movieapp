import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import React, {useContext} from 'react';
//ui
import {Button, Layout, Text} from '@ui-kitten/components';
import defaultImage from '../../assets/default-image.png';
import starDark from '../../assets/starDark.png';
//Context
import {MovieDataContext} from '../../context/MovieDataContext';
//Utils
import {map} from 'lodash';
import {Rating} from 'react-native-ratings';
//Constantes
import {
  BASE_PATH_IMG,
  MOVIE_DATA_PATH,
} from '../../../../utils/constants/constants';
const {height} = Dimensions.get('window');

export default function PopularMovies(props) {
  const {navigation} = props;
  const {
    page,
    setPage,
    disableButton,
    showMoreMoviesButton,
    popularMoviesList,
    getPopularMovies,
    getMovieData,
  } = useContext(MovieDataContext);

  const onClickMoreMoviesButton = () => {
    getPopularMovies();

    setPage({...page, popularMovies: page.popularMovies + 1});
  };

  return popularMoviesList ? (
    <ScrollView>
      <Layout style={{minHeight: height}}>
        {/* Lista de peliculas */}
        {map(popularMoviesList, (item, index) => (
          <Movie
            key={index}
            navigation={navigation}
            movieData={item}
            getMovieData={getMovieData}
          />
        ))}

        {/* Boton cargar mas */}
        {showMoreMoviesButton && (
          <Button
            onPress={() => onClickMoreMoviesButton()}
            disabled={disableButton}>
            Cargar mas
          </Button>
        )}
      </Layout>
    </ScrollView>
  ) : (
    <Layout>
      <ActivityIndicator style={{minHeight: height}} size="large" />
    </Layout>
  );
}

const Movie = props => {
  const {navigation, movieData, getMovieData} = props;
  const {id, title, release_date, poster_path, vote_count, vote_average} =
    movieData;

  const onClickMovie = () => {
    getMovieData(id);

    navigation.navigate(MOVIE_DATA_PATH, {movieID: id});
  };

  return (
    <TouchableHighlight onPress={() => onClickMovie()}>
      <View style={styles.movie}>
        {/* Imagen */}
        <View style={styles.left}>
          <Image
            source={
              poster_path
                ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                : defaultImage
            }
            style={styles.image}
          />
        </View>

        <View>
          {/* Titulo */}
          <Text category="h6">{title}</Text>

          {/* Fecha de estreno */}
          <Text>{release_date}</Text>

          {/* Rating */}
          <MovieRating vote_count={vote_count} vote_average={vote_average} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const MovieRating = props => {
  const {vote_count, vote_average} = props;
  const media = vote_average / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={starDark}
        ratingColor={'#ffc205'}
        ratingBackgroundColor={'#192734'}
        startingValue={media}
        imageSize={20}
        style={styles.rating}
      />

      {/* Contador de votos */}
      <Text style={styles.voteCount}>{vote_count} votos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  lodadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
  rating: {
    marginRight: 15,
  },
  voteCount: {
    fontSize: 12,
    color: '#8697a5',
    marginTop: 5,
  },
});
