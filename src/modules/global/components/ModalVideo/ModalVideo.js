import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
//ui
import {Icon, Button, Modal} from '@ui-kitten/components';
//context
import {MovieDataContext} from '../../../movies/context/MovieDataContext';
//Utils
import {WebView} from 'react-native-webview';
//Icons
const CloseIcon = props => <Icon name="close-circle-outline" {...props} />;

export default function ModalVideo(props) {
  const {showVideoModal, setShowVideoModal} = props;
  const {movieTrailer} = useContext(MovieDataContext);

  return (
    <View>
      <Modal
        visible={showVideoModal}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowVideoModal(false)}>
        {/* Video */}
        <WebView
          style={{width: 500}}
          source={{
            uri: movieTrailer,
          }}
        />

        {/* Cerrar Modal */}
        <Button
          style={styles.close}
          status="danger"
          accessoryLeft={CloseIcon}
          onPress={() => setShowVideoModal(false)}
        />
      </Modal>
    </View>
  );
}

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
