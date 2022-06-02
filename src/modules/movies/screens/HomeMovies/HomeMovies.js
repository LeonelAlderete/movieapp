import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useContext} from 'react';
//ui
import {Layout, Text} from '@ui-kitten/components';
//context
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
  const {
    allGenres,
    selectedGenre,
    setSelectedGenre,
    recommendedMovies,
    popularMoviesList,
  } = useContext(MovieDataContext);

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

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
