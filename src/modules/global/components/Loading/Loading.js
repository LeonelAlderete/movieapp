import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
//ui
import {Text, Layout} from '@ui-kitten/components';
//Constantes
const {height} = Dimensions.get('window');

export default function Loading() {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>Cargando...</Text>

      <ActivityIndicator size="large" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
  },
});
