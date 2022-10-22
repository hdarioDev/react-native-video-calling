import { SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import CallingScreen from './src/screens/CallingScreen'
import IncomingCallScreen from './src/screens/IncomingCallScreen'
import CallScreen from './src/screens/CallScreen'
import Navigation from './src/navigation';


const App = () => {

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Navigation />
    </>
  )
}



export default App

