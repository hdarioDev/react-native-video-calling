import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CallActionBox from '../components/CallActionBox'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../navigation';

interface Props extends NativeStackScreenProps<RootStackParams, 'Calling'> { };

const CallingScreen = ({ navigation, route }: Props) => {
  // console.log("route ", route.params.);

  // const navigation = useNavigation<any>()
  const params = route.params;
  console.log("params ", params);

  const goBack = () => {
    console.log("return");
    navigation.pop();

  }
  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <MaterialIcons
          name="arrow-back-ios"
          color="white"
          size={20}
        />
      </Pressable>

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{params.user_display_name}</Text>
        <Text style={styles.phoneNumber}> Rining +591 78872560</Text>

      </View>
      <CallActionBox />
    </View>
  )
}

export default CallingScreen

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#8D78CC'
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    marginTop: 40
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  phoneNumber: {
    fontSize: 25,
    color: 'white'
  },
  backButton: {
    top: 60,
    position: 'absolute',
    left: 15,
    zIndex: 10
  }

})

