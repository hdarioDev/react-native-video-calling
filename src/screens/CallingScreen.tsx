import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CallActionBox from '../components/CallActionBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation';
import {Voximplant} from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

interface Props extends NativeStackScreenProps<any, any> {}

const CallingScreen = ({navigation, route}: Props) => {
  // console.log("route ", route.params.);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  // const navigation = useNavigation<any>()
  console.log('route params ----> ', route.params);

  const {call: incomingCall, isIncomingCall} = route.params as any;
  const {params: callUser} = route as any;

  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const [useVideo, setUseVideo] = useState(false);

  console.log('======> incomingCall ', incomingCall);
  console.log('======> isIncomingCall ', isIncomingCall);
  console.log('======> callUser ', callUser);

  // console.log("params ", callUser);
  const voximplant = Voximplant.getInstance();
  const call = useRef<any>(incomingCall);
  const endpoint = useRef<any>(null);

  const goBack = () => {
    console.log('return');
    navigation.pop();
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      requestPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    let videoLocal: any = undefined;
    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };
    const makeCall = async () => {
      call.current = await voximplant.call(callUser.user_name, callSettings);
      // console.log("call ", call);
      subscribeToCallEvents();
    };
    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent: any) => {
        showError(callEvent.reason);
      });
      call.current.on(
        Voximplant.CallEvents.ProgressToneStart,
        (callEvent: any) => {
          setCallStatus('Calling...');
        },
      );
      call.current.on(Voximplant.CallEvents.Connected, (callEvent: any) => {
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, (callEvent: any) => {
        navigation.navigate('Contacts');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        (callEvent: any) => {
          videoLocal = callEvent.videoStream.id;
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent: any) => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };
    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        (endpointEvent: any) => {
          //alta voz
          Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(
            Voximplant.Hardware.AudioDevice.SPEAKER,
          );
          setLocalVideoStreamId(videoLocal);
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
          setTimeout(() => {
            setUseVideo(true);
          }, 3000);
        },
      );
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const showError = (reason: any) => {
    Alert.alert('Call failed', `Reason: ${reason}`, [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Contacts'),
      },
    ]);
  };

  const onHangupPress = () => {
    call.current.hangup();
  };

  console.log('=======================>', useVideo ? 'si ' : 'no');

  return (
    <>
      <View style={styles.page}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" color="white" size={20} />
        </Pressable>

        <View style={styles.remoteVideo}>
          <Voximplant.VideoView
            videoStreamId={remoteVideoStreamId}
            style={{height: '100%'}}
            howOnTop={false}
            scaleType={Voximplant.RenderScaleType.SCALE_FILL}
          />
        </View>

        {useVideo && (
          <>
            <View style={styles.localVideo}>
              <Voximplant.VideoView
                videoStreamId={localVideoStreamId}
                style={styles.localVideo}
                howOnTop={true}
                scaleType={Voximplant.RenderScaleType.SCALE_FILL}
              />
            </View>
          </>
        )}

        <View style={styles.cameraPreview}>
          <Text style={styles.name}>{callUser.user_display_name}</Text>
          {/* <Text style={styles.phoneNumber}> Rining +591 78872560</Text> */}
          <Text style={styles.phoneNumber}> {callStatus} </Text>
        </View>
        <CallActionBox onHangupPress={onHangupPress} />
      </View>
    </>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    // backgroundColor: 'red',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    marginTop: 40,
  },
  localVideo: {
    width: 120,
    height: 170,
    // backgroundColor: '#ffff6e',
    borderRadius: 14,
    position: 'absolute',
    right: 8,
    bottom: 60,
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#666566',
    // flex: 1,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    // top: -90,
    // bottom: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 25,
    color: 'white',
  },
  backButton: {
    top: 60,
    position: 'absolute',
    left: 15,
    zIndex: 10,
  },
});
