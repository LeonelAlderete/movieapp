import React, {useState} from 'react';
//ui
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {
  HOME_PATH,
  NEWS_MOVIES_PATH,
  POPULAR_MOVIES_PATH,
} from '../utils/constants/constants';

export default function DrawerContent(props) {
  const {navigation} = props;

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const onClickOption = screen => {
    navigation.navigate(screen);
  };

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {/* Inicio */}
      <DrawerItem title="Inicio" onPress={() => onClickOption(HOME_PATH)} />

      {/* Nuevas Peliculas */}
      <DrawerItem
        title="Nuevas Peliculas"
        onPress={() => onClickOption(NEWS_MOVIES_PATH)}
      />

      {/* Peliculas populares */}
      <DrawerItem
        title="Peliculas Populares"
        onPress={() => onClickOption(POPULAR_MOVIES_PATH)}
      />
    </Drawer>
  );
}
