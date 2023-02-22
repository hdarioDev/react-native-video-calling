import {StyleSheet, View} from 'react-native';
import React from 'react';
import CallActionBox from '../components/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />
      <CallActionBox onHangupPress={() => {}} />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#6638f0',
  },
  cameraPreview: {
    // flex: 1,
    // alignItems: 'center',
    width: 100,
    height: 150,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: 100,
    borderRadius: 10,
  },
});
