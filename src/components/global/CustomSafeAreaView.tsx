import { StyleSheet, Text, View } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps{
    children:ReactNode;
    classStyle?:string
}

const CustomSafeAreaView:FC<CustomSafeAreaViewProps> = ({children,classStyle}) => {
    const styleClass=`flex-1 bg-white ${classStyle}`
  return (
    <SafeAreaView className={styleClass}>
      <View className={styleClass}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default CustomSafeAreaView

