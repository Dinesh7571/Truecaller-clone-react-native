import {  Text, TextInput, TouchableOpacity, View,FlatList } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { findUser } from '../service/authService'
import CallerItem from '../components/ui/CallerItem'
import CustomSafeAreaView from '../components/global/CustomSafeAreaView'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { Colors } from '../utils/Constants'
import { goBack } from '../utils/NavigationUtils'

const SearchScreen:FC = () => {
 const [searchQuery ,setSearchQuery]=useState('')
 const [searchData , setSearchData]=useState<any>([])


 const renderCallers=({item}:any)=>{
  return <CallerItem isContacts item={item} />
}

 const fetchUsers =async()=>{
  if(searchQuery.length==10){
    try {
       const data=await findUser(searchQuery)
       setSearchData([data])
    } catch (error) {
       console.log(error)
    }
  }
 }

 useEffect(()=>{
   fetchUsers()
 },[searchQuery])

  return (
    <CustomSafeAreaView classStyle='px-2'>
      <View className='flex-row w-full items-center justify-between '>
        <View
        className='mt-3 w-4/5 flex-row items-center justify-between rounded-full px-4 bg-backgroundLight'
        >
          <MagnifyingGlassIcon size={22} color={Colors.text}/>
          <TextInput
          placeholder='Search number here'
          placeholderTextColor='#aaa'
          onChangeText={setSearchQuery}
          value={searchQuery}
          maxLength={10}
          keyboardType='number-pad'
          className='h-16  w-full ml-2'
          />
        </View>
        <TouchableOpacity onPress={()=>goBack()} className='w-1/6'>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={searchData}
      renderItem={renderCallers}
      keyExtractor={(item)=>item._id }
      className='mt-5'
      ListEmptyComponent={
        <View className='mt-5 items-center'>
           <View className='rounded-full bg-backgroundLight self-center p-5'>
            <MagnifyingGlassIcon size={26}  color={Colors.lightText}/>
           </View>
           <Text className='mt-2 font-medium text-gray-500'>No Search items found here !</Text>
        </View>
      }
      />
      
    </CustomSafeAreaView>
  )
}

export default SearchScreen

