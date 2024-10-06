import { NativeModules, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { Colors } from './src/utils/Constants'
import { checkPermissions } from './src/utils/PhoneService'
const {CallScreeningModule}=NativeModules
const App = () => {
  useEffect(()=>{
    checkPermissions(CallScreeningModule)
  },[])
  return (
    
    <>
    <Navigation/>
    <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary}/>
    </>
     
  
   
  )
}

export default App

const styles = StyleSheet.create({})