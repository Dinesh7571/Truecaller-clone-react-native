import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../utils/NavigationUtils'
import SplashScreen from '../screens/SplashScreen'
import SearchScreen from '../screens/SearchScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AuthScreen from '../screens/AuthScreen'
import DashboardScreen from '../screens/DashboardScreen'
import CallerScreen from '../screens/CallerScreen'
import { Colors } from '../utils/Constants'
import withIncomingCall from '../components/global/WithIncomingCall'

const Stack =createNativeStackNavigator()
const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>

        <Stack.Navigator initialRouteName='SplashScreen'
           screenOptions={{headerShown:false}}
        >
            <Stack.Screen name='SplashScreen' component={  SplashScreen}/>
            <Stack.Screen name='CallerScreen' component={withIncomingCall(CallerScreen) }/>
            <Stack.Screen name='DashboardScreen' component={withIncomingCall(DashboardScreen)  }/>
            <Stack.Screen name='SearchScreen' component={withIncomingCall(SearchScreen)}/>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
            <Stack.Screen name='AuthScreen' component={AuthScreen}/>
    
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Navigation

