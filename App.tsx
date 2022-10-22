import { SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
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

