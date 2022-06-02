import React from 'react';
//Navigation
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import HomeMovies from '../modules/movies/screens/HomeMovies';
import MovieData from '../modules/movies/screens/MovieData';
import NewMovies from '../modules/movies/screens/NewMovies';
import PopularMovies from '../modules/movies/screens/PopularMovies';
import SearchMovies from '../modules/movies/screens/SearchMovies';
//Constantes
import {
  HOME_PATH,
  MOVIE_DATA_PATH,
  NEWS_MOVIES_PATH,
  POPULAR_MOVIES_PATH,
  SEARCH_MOVIES_PATH,
} from '../utils/constants/constants';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={HOME_PATH} component={HomeMovies} />
      <Stack.Screen name={MOVIE_DATA_PATH} component={MovieData} />
      <Stack.Screen name={NEWS_MOVIES_PATH} component={NewMovies} />
      <Stack.Screen name={POPULAR_MOVIES_PATH} component={PopularMovies} />
      <Stack.Screen name={SEARCH_MOVIES_PATH} component={SearchMovies} />
    </Stack.Navigator>
  );
}
