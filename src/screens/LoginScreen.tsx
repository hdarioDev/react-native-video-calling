import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const voximplant = Voximplant.getInstance();
  const navigation = useNavigation<any>();
  useEffect(() => {
    const connect = async () => {
      let clientState = await voximplant.getClientState();
      console.log('----> ', {clientState});

      if (clientState === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (clientState === Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
      }
    };
    connect();
    console.log('Voximplant.ClientState. ', Voximplant.ClientState);
  }, []);

  const onSignIn = async () => {
    console.log('log in');
    try {
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      console.log('fqUsername ', fqUsername);

      await voximplant.login(fqUsername, password);
      redirectHome();
    } catch (error) {
      console.log('error', error);
      Alert.alert(error.name, `Error code : ${error.code}`);
      // Alert.alert(`Error : ${error}`)
    }
  };

  const redirectHome = () => {
    navigation.reset({
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };
  return (
    <View style={styles.page}>
      <TextInput
        placeholder="username"
        style={styles.input}
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onSignIn}
        activeOpacity={0.7}>
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    background: 'gray',
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1380CC',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
