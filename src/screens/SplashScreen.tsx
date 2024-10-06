import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '../utils/Constants'
import { navigate, resetAndNavigate } from '../utils/NavigationUtils'
import { storage } from '../state/storage'
import {decode} from 'base-64'
import { jwtDecode } from "jwt-decode";
global.atob = decode;

interface DecodedToken{
  exp:number
}

const SplashScreen:FC = () => {
 
 const tokenCheck=async()=>{
  const accessToken= storage.getString('accessToken') as string
  
  if(accessToken){
    console.log(accessToken)
    const decodedAccessToken=  jwtDecode<DecodedToken>(accessToken)
    console.log(decodedAccessToken)
    const currentTime=Date.now()/1000
    if(decodedAccessToken?.exp>=currentTime){
      resetAndNavigate('DashboardScreen')
      return
    }
  }
    resetAndNavigate("AuthScreen")
 }

  useEffect(()=>{
    

    setTimeout(()=>{
      tokenCheck()
    },900)
      
   
  },[])

  return (
    <View className='flex-1 bg-white justify-center items-center '>
       <Image source={require('../assets/logo.png')}
       className='h-40 w-40 rounded-full'
       />
      <View className='absolute bottom-20'>
       <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})