import {View, ScrollView, Dimensions} from 'react-native';
import React, {useContext} from 'react';
//ui
import styles from './home-styles';
import {Layout, Text} from '@ui-kitten/components';
//context
import {GenreDataContext} from '../../context/GenreDataContext';
import {MovieDataContext} from '../../context/MovieDataContext';
//Utils
import {map} from 'lodash';
//Componentes
import Loading from '../../../global/components/Loading/Loading';
import DefaultHeader from '../../../global/components/Header/DefaultHeader';
import BigCarousel from '../../../global/components/BigCarousel';
import SmallCarousel from '../../../global/components/SmallCarousel';
//Constantes
const {height} = Dimensions.get('window');

export default function HomeMovies(props) {
  const {navigation} = props;
  const {recommendedMovies, popularMoviesList} = useContext(MovieDataContext);
  const {allGenres, selectedGenre, setSelectedGenre} =
    useContext(GenreDataContext);

  return popularMoviesList && recommendedMovies && allGenres ? (
    <Layout style={{minHeight: height}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <DefaultHeader navigation={navigation} headerTitle="The Movie App" />

        {/* Carousel Peliculas Populares */}
        {popularMoviesList && (
          <View style={styles.news}>
            <Text style={styles.newsTitle}>Peliculas Populares</Text>

            <BigCarousel data={popularMoviesList} navigation={navigation} />
          </View>
        )}

        {/* Lista de generos disponibles */}
        <GenresList
          allGenres={allGenres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />

        {/* Carousel de genero seleccionado */}
        {recommendedMovies && (
          <SmallCarousel navigation={navigation} data={recommendedMovies} />
        )}
      </ScrollView>
    </Layout>
  ) : (
    <Loading />
  );
}

const GenresList = props => {
  const {allGenres, selectedGenre, setSelectedGenre} = props;

  const onClickGenre = genreID => {
    setSelectedGenre(genreID);
  };

  return (
    <View style={styles.genres}>
      {/* Titulo */}
      <Text style={styles.genresTitle}>Peliculas por genero</Text>

      {/* Lista */}
      <ScrollView
        style={styles.genreList}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {map(allGenres, genre => (
          <Text
            style={[
              styles.genre,
              {color: selectedGenre == genre.id ? '#fff' : '#8697a5'},
            ]}
            key={genre.id}
            onPress={() => onClickGenre(genre.id)}>
            {genre.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};
