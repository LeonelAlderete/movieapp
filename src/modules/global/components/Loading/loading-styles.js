import {StyleSheet, Dimensions} from 'react-native';
//Constantes
const {height} = Dimensions.get('window');

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

export default styles;
