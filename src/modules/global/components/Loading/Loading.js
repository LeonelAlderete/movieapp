import {ActivityIndicator} from 'react-native';
import React from 'react';
//ui
import styles from './loading-styles';
import {Text, Layout} from '@ui-kitten/components';

export default function Loading() {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>Cargando...</Text>

      <ActivityIndicator size="large" />
    </Layout>
  );
}
