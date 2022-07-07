import {
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useContext} from 'react';
//ui
import styles from './searchmovies-styles';
import {Button, Text, Input, Layout} from '@ui-kitten/components';
//Context
import {MovieDataContext} from '../../context/MovieDataContext';
//Utils
import {size, map} from 'lodash';
//Componentes
import BackScreenHeader from '../../../global/components/Header/BackScreenHeader';
//Constantes
import {
  BASE_PATH_IMG,
  MOVIE_DATA_PATH,
} from '../../../../utils/constants/constants';
const {height} = Dimensions.get('window');

export default function SearchMovies(props) {
  const {navigation} = props;
  const {disableButton, searchResult, searchMovie, getMovieData} =
    useContext(MovieDataContext);
  const [searchValue, setSearchValue] = useState('');

  const onClickSearchMovie = () => {
    if (size(searchValue) > 2) {
      searchMovie(searchValue);
    }
  };

  return (
    <Layout style={{minHeight: height}}>
      {/* Header */}
      <BackScreenHeader navigation={navigation} />

      <ScrollView>
        {/* Buscador */}
        <View style={styles.inputContainer}>
          {/* Input */}
          <Input
            placeholder="Buscar pelicula"
            onChangeText={e => setSearchValue(e)}
            style={styles.input}
          />

          {/* Boton */}
          <Button
            style={styles.button}
            onPress={() => onClickSearchMovie()}
            disabled={disableButton}>
            Buscar
          </Button>
        </View>

        {/* Lista de peliculas */}
        <View style={styles.resultContainer}>
          {map(searchResult, (item, index) => (
            <Movie
              key={index}
              movieData={item}
              getMovieData={getMovieData}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}

const Movie = props => {
  const {navigation, movieData, getMovieData} = props;
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
