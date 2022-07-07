import {View, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
//Navigation
import React, {useState, useContext, useEffect} from 'react';
//ui
import {Text} from '@ui-kitten/components';
import styles from './bigcarousel-styles';
//Context
import {MovieDataContext} from '../../../movies/context/MovieDataContext';
import {GenreDataContext} from '../../../movies/context/GenreDataContext';
//utils
import Carousel from 'react-native-snap-carousel';
import {map, size} from 'lodash';
//Constantes
import {
  BASE_PATH_IMG,
  MOVIE_DATA_PATH,
} from '../../../../utils/constants/constants';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function BigCarousel(props) {
  const {navigation, data} = props;
  const [carouselData, setCarouselData] = useState([]);

  /* El carousel solo renderiza los primeros 10 elementos */
  useEffect(() => {
    const onStart = () => {
      let auxData = [];

      for (let i = 0; i < 10; i++) {
        auxData.push(data[i]);
      }

      setCarouselData(auxData);
    };

    onStart();
  }, []);

  return (
    <Carousel
      layout="default"
      data={carouselData}
      renderItem={item => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

const RenderItem = props => {
  const {data, navigation} = props;
  const {id, title, poster_path, genre_ids} = data.item;
  //Context
  const {disableButton, getMovieData} = useContext(MovieDataContext);
  const {setMovieGenre} = useContext(GenreDataContext);

  //URL imagen
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  //Generos de pelicula
  const movieGenre = setMovieGenre(genre_ids);

  const onPressItem = () => {
    getMovieData(id);
    navigation.navigate(MOVIE_DATA_PATH, {movieID: id});
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onPressItem()}
      disabled={disableButton}>
      <View style={styles.card}>
        {/* Portada de pelicula */}
        <Image style={styles.image} source={{uri: imageUrl}} />

        {/* Titulo de pelicula */}
        <Text category="h5" style={styles.title}>
          {title}
        </Text>

        {/* Generos de pelicula */}
        <View style={styles.genres}>
          {movieGenre &&
            map(movieGenre, (genre, index) => (
              <Text key={index} category="c1" style={styles.genre}>
                {genre}
                {index !== size(movieGenre) - 1 && ', '}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
