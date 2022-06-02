import {LogBox} from 'react-native';
import React from 'react';
//Navegacion
import {NavigationContainer} from '@react-navigation/native';
//ui
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider as KittenUIProvider,
  IconRegistry,
} from '@ui-kitten/components';
//Context
import MovieDataProvider from './src/modules/movies/context/MovieDataContext';
//Componentes
import DrawerNavigation from './src/navigation/DrawerNavigation';

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.']);

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <KittenUIProvider {...eva} theme={eva.dark}>
        <MovieDataProvider>
          <NavigationContainer>
            <DrawerNavigation />
          </NavigationContainer>
        </MovieDataProvider>
      </KittenUIProvider>
    </>
  );
}
