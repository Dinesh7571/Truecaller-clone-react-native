import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { useUserStore } from '../../state/userStore'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { Colors } from '../../utils/Constants'
import { navigate } from '../../utils/NavigationUtils'


const DashboardHeader:FC = () => {
  const {user}=useUserStore()
  return (
    <View>
     <View className='my-1'>
        <Text className='text-gray-500'>Welcome</Text>
        <Text className='text-text font-semibold text-3xl'>{user?.name.split(" ")[0]|| "Unknown"}</Text>
     </View>
      <TouchableOpacity className='h-40'>
        <Image source={require("../../assets/images/banner.jpg")}
         style={{resizeMode:'contain',height:'100%', width:'100%' }}
        />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigate('SearchScreen')}
      className='mt-3 flex-row items-center space-x-3 rounded-full px-4 py-4 bg-backgroundLight'>
        <MagnifyingGlassIcon size={24} color={Colors.text} />
        <Text className='text-gray-700 w-full'>Search a number</Text>
      </TouchableOpacity>
      <Text className='my-4 text-base font-semibold text-text'>Rescents</Text>
    </View>
  )
}

export default DashboardHeader