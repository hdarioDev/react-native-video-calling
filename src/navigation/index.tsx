import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CallingScreen from '../screens/CallingScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import CallScreen from '../screens/CallScreen';
import ContactsScreens from '../screens/ContactsScreens';
import { IContact } from '../interfaces';

export type RootStackParams = {
    Contacts: undefined,
    Call: undefined,
    Login: undefined,
    IncomingCall: undefined,
    Calling: undefined,
}

const Stack = createNativeStackNavigator<RootStackParams>();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name="Contacts" component={ContactsScreens} />
                <Stack.Screen name="Login" component={LoginScreen} />

                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
                    <Stack.Screen name="Calling" component={CallingScreen} />
                    <Stack.Screen name="Call" component={CallScreen} />
                </Stack.Group>


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation