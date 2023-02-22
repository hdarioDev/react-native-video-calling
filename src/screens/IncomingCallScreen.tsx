import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

import bg from '../assets/images/ios_bg.png';

const IncomingCallScreen = () => {
  const [caller, setCaller] = useState('');
  const route = useRoute();
  const navigation = useNavigation<any>();
  const {call} = route.params as any;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected, (callEvent: any) => {
      navigation.navigate('Contacts');
    });
    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  const onHandleDecline = () => {
    call.decline();
  };
  const onHandleAccept = () => {
    // console.warn('on Accept')
    navigation.navigate('Calling', {
      call,
      isIncomingCall: true,
    });
  };

  return (
    // <View style={styles.root}>
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>{caller}</Text>
      <Text style={styles.phoneNumber}> ✅ ReactN Video...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" color="white" size={32} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="chatbubble" color="white" size={32} />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable onPress={onHandleDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Ionicons name="close-outline" color="white" size={45} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>
        {/* Accept Button */}
        <Pressable onPress={onHandleAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#1F7FD7'}]}>
            <Ionicons name="checkmark-outline" color="white" size={45} />
          </View>
          {/* <MaterialCommunityIcons name='check' color='white' size={32} /> */}
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
    // </View>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  // root: {
  //   height: '100%',
  // },
  bg: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 100,
  },
  phoneNumber: {
    fontSize: 25,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    // margin: 10
  },
});
