import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getAbbrName } from '../utils/miscUtils'
import { addMultipleContacts, reportSpam } from '../service/authService'
import CustomSafeAreaView from '../components/global/CustomSafeAreaView'
import { goBack } from '../utils/NavigationUtils'
import { ChatBubbleOvalLeftEllipsisIcon, ChevronLeftIcon, EllipsisHorizontalCircleIcon, NoSymbolIcon, PhoneArrowUpRightIcon, ShieldExclamationIcon } from 'react-native-heroicons/outline'
import { Colors, formatPhoneNumber } from '../utils/Constants'

type CallerScreenrouteParams = {
  item: {
    name: string,
    isSpam: boolean,
    phoneNumber: number
  }
}

type CallerScreenRouteProps = RouteProp<{ CallerScreen: CallerScreenrouteParams }, 'CallerScreen'>

const ActionButton: FC<{
  onPress: () => void;
  icon: JSX.Element;
  label: string
}> = ({ onPress, icon, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className='items-center space-y-1'>
      <View className='rounded-xl border-border border-2 p-4'>
        {icon}
      </View>
      <Text className='font-semibold text-xs text-gray-700'>{label}</Text>
    </TouchableOpacity>
  )

}

const CallerScreen: FC = () => {

  const route = useRoute<CallerScreenRouteProps>()
  const item = route?.params.item
  const borderColor = `${item?.isSpam ? 'border-error' : 'border-primary'}`
  const bgColor = `${item?.isSpam ? 'bg-red-100' : 'bg-backgroundLight'}`
  const textColor = `${item?.isSpam ? 'text-red-500' : 'text-primary'}`

  const abbrName = item?.name ? getAbbrName(item?.name) : "UN"
  const addUser = async () => {
    try {

      await addMultipleContacts([item])

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    addUser()
  }, [])


  return (
    <CustomSafeAreaView>
      <View className='flex-row mt-2 items-center justify-between px-2'>
        <TouchableOpacity onPress={goBack} className='flex-row items-center '>
          <ChevronLeftIcon size={20} color={Colors.primary} />
          <Text className='font-medium text-primary text-md'>Back </Text>
        </TouchableOpacity>
        <Text className='font-medium text-gray-400 text-xs'>IDENTIFIED BY TRUECALLER</Text>
        <EllipsisHorizontalCircleIcon size={22} color={Colors.primary} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View className=' items-center m-4'>

          <View className={`${bgColor} ${borderColor} border-2 rounded-full h-32 w-32 justify-center items-center`}>
            <Text className={`${textColor} text-3xl font-semibold `}>{abbrName}</Text>
          </View>
          <Text className='text-2xl font-normal mt-2 text-text'>{item?.name || "Unknown"}</Text>

          <View className='my-4 w-full flex-row items-center justify-around '>
            <ActionButton
              onPress={() => Linking.openURL(`tel:${item?.phoneNumber}`)}
              icon={<PhoneArrowUpRightIcon color={Colors.primary} size={20} />}
              label='Call'
            />
            <ActionButton
              onPress={() => Linking.openURL(`sms:${item?.phoneNumber}`)}
              icon={<ChatBubbleOvalLeftEllipsisIcon color={Colors.primary} size={20} />}
              label='Message'
            />

            <ActionButton
              onPress={async () => {
                try {
                  await reportSpam(item?.phoneNumber)
                } catch (error) {
                  console.log(error)
                }
              }}
              icon={<ShieldExclamationIcon color={Colors.primary} size={20} />}
              label='Report Spam'
            />
            <ActionButton
              onPress={() => { }}
              icon={<NoSymbolIcon color={Colors.primary} size={20} />}
              label='Block'
            />
          </View>
        
         <View className=' rounded-xl w-full my-2 border-border border-2 p-4'>
          <Text className='text-md font-normal text-gray-500'>Mobile - SIM</Text>
          <Text className='text-text text-base font-normal'>{formatPhoneNumber(item?.phoneNumber?.toString())}</Text>
         </View>

         
         <View className=' rounded-xl w-full my-2 border-border border-2 p-4'>
          <Text className='text-md font-normal text-gray-500'>Address </Text>
          <Text className='text-text text-base font-normal'>India</Text> 
         </View>

         <Text className='font-semibold text-center text-md  my-2 text-teal-500'>ADVERTISEMENT</Text>

         <TouchableOpacity className='my-4'>
            <Image source={require('../assets/images/banner.jpg')} className='w-80 self-center h-28'/>
         </TouchableOpacity>
        

         </View>
      </ScrollView>

    </CustomSafeAreaView>
  )
}

export default CallerScreen

const styles = StyleSheet.create({})