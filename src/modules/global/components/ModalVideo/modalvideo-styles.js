import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '50%',
    alignItems: 'center',
  },
  close: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: -100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  webView: {
    width: 500,
  },
});

export default styles;
