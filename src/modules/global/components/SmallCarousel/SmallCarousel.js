import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext} from 'react';
//ui
import styles from './smallcarousel-styles';
import {Text} from '@ui-kitten/components';
//Context
import {MovieDataContext} from '../../../movies/context/MovieDataContext';
//Utils
import Carousel from 'react-native-snap-carousel';
//Constantes
import {
  BASE_PATH_IMG,
  MOVIE_DATA_PATH,
} from '../../../../utils/constants/constants';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

export default function SmallCarousel(props) {
  const {navigation, data} = props;

  return (
    <Carousel
      layout="default"
      data={data}
      renderItem={item => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
}

const RenderItem = props => {
  const {navigation, data} = props;
  const {id, title, poster_path} = data.item;
  //Context
  const {disableButton, getMovieData} = useContext(MovieDataContext);

  //URL imagen
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onClickItem = () => {
    getMovieData(id);
    navigation.navigate(MOVIE_DATA_PATH, {movieID: id});
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onClickItem()}
      disabled={disableButton}>
      <View style={StyleSheet.card}>
        {/* Portada */}
        <Image style={styles.image} source={{uri: imageUrl}} />

        {/* Titulo */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
