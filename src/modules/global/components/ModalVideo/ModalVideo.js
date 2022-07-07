import {View} from 'react-native';
import React, {useContext} from 'react';
//ui
import styles from './modalvideo-styles';
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
