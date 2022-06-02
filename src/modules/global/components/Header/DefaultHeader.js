import React from 'react';
//ui
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
//Constantes
import {SEARCH_MOVIES_PATH} from '../../../../utils/constants/constants';
//UI Kitten iconos
const MenuIcon = props => <Icon name="menu-outline" {...props} />;
const SearchIcon = props => <Icon name="search-outline" {...props} />;

export default function DefaultHeader(props) {
  const {navigation, headerTitle} = props;

  //Mostrar Drawer Menu
  const LeftOption = () => {
    return (
      <TopNavigationAction
        icon={MenuIcon}
        onPress={() => navigation.openDrawer()}
      />
    );
  };

  //Ir a screen "Buscar peliculas"
  const RightOption = () => {
    return (
      <TopNavigationAction
        icon={SearchIcon}
        onPress={() => navigation.navigate(SEARCH_MOVIES_PATH)}
      />
    );
  };

  return (
    <TopNavigation
      title={headerTitle}
      alignment="center"
      accessoryLeft={LeftOption}
      accessoryRight={RightOption}
    />
  );
}
