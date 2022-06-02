import React from 'react';
//ui
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
//UI Kitten iconos
const LeftArrow = props => <Icon name="arrow-ios-back-outline" {...props} />;

export default function BackScreenHeader(props) {
  const {navigation} = props;

  //Volver a Screen anterior
  const LeftOption = () => {
    return (
      <TopNavigationAction
        icon={LeftArrow}
        onPress={() => navigation.goBack()}
      />
    );
  };

  return <TopNavigation alignment="center" accessoryLeft={LeftOption} />;
}
