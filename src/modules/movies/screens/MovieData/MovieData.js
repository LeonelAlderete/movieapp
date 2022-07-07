import {View, Image, ScrollView, Dimensions} from 'react-native';
import React, {useState, useContext} from 'react';
//ui
import styles from './moviedata-styles';
import {Text, Button, Icon, Layout} from '@ui-kitten/components';
import starDark from '../../assets/starDark.png';
//Context
import {MovieDataContext} from '../../context/MovieDataContext';
//utils
import {map} from 'lodash';
import {Rating} from 'react-native-ratings';
//Componentes
import Loading from '../../../global/components/Loading';
import BackScreenHeader from '../../../global/components/Header/BackScreenHeader';
import ModalVideo from '../../../global/components/ModalVideo';
//constantes
import {BASE_PATH_IMG} from '../../../../utils/constants/constants';
//Icons
const {height} = Dimensions.get('window');
const PlayIcon = props => <Icon name="play-circle-outline" {...props} />;

export default function MovieData(props) {
  const {navigation, route} = props;
  const {movieData} = useContext(MovieDataContext);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const movieID = route.params.movieID;

  //Verificar los ID para que no se renderize una pelicula vista anterioremente
  return movieData && movieData.id === movieID ? (
    <Layout style={{minHeight: height - 50}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <BackScreenHeader navigation={navigation} />

        {/* Portada */}
        <MovieImage movieData={movieData} />

        {/* Boton Play Trailer */}
        <PlayTrailerButton
          movieID={movieID}
          setShowVideoModal={setShowVideoModal}
        />

        {/* Titulo */}
        <MovieTitle movieData={movieData} />

        {/* Rating */}
        <MovieRating movieData={movieData} />

        {/* Descripcion */}
        <Text style={styles.overview}>{movieData.overview}</Text>

        {/* Fecha de lanzamiento */}
        <Text style={styles.overview}>
          Fecha de lanzamiento: {movieData.release_date}
        </Text>
      </ScrollView>

      {/* Modal */}
      <ModalVideo
        showVideoModal={showVideoModal}
        setShowVideoModal={setShowVideoModal}
      />
    </Layout>
  ) : (
    <Loading />
  );
}

const MovieImage = props => {
  const {movieData} = props;
  const {poster_path} = movieData;
  const imgURL = `${BASE_PATH_IMG}/w500${poster_path}`;

  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{uri: imgURL}} />
    </View>
  );
};

const PlayTrailerButton = props => {
  const {movieID, setShowVideoModal} = props;
  const {disableButton, getMovieTrailers} = useContext(MovieDataContext);

  const onClickPlayButton = async () => {
    await getMovieTrailers(movieID);

    setShowVideoModal(true);
  };

  return (
    <View style={styles.viewPlay}>
      <Button
        style={styles.play}
        accessoryLeft={PlayIcon}
        status="primary"
        onPress={() => onClickPlayButton()}
        disabled={disableButton}
      />
    </View>
  );
};

const MovieTitle = props => {
  const {movieData} = props;
  const {title, genres} = movieData;

  return (
    <View style={styles.viewInfo}>
      {/* Titulo */}
      <Text category="h5">{title}</Text>

      {/* Categorias */}
      <View style={styles.viewGenres}>
        {map(genres, genre => (
          <Text style={styles.genre} key={genre.id}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MovieRating = props => {
  const {movieData} = props;
  const {vote_count, vote_average} = movieData;

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
        style={{marginRight: 20}}
      />

      {/* Media de votos */}
      <Text style={styles.voteMedia}>{media}</Text>

      {/* Contador de votos */}
      <Text style={styles.voteCount}>- {vote_count} votos</Text>
    </View>
  );
};
