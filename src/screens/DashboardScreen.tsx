import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../state/userStore'
import CustomSafeAreaView from '../components/global/CustomSafeAreaView'
import { getAbbrName } from '../utils/miscUtils'
import UserAvatar from '../components/ui/UserAvatar'
import CallLogs from '../utils/CallLogs'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { Colors } from '../utils/Constants'
import CallerItem from '../components/ui/CallerItem'
import DashboardHeader from '../components/Dashboard/DashboardHeader'
import ContactList from '../components/Dashboard/ContactList'
const DashboardScreen = () => { 


  const {user}=useUserStore()
  const [callLogs,setCallLogs ]=useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
 
  const renderCallers=({item}:any)=>{
    return(<CallerItem item={item}/>)
  }

  const fetchResentLogs=()=>{
    CallLogs.getRecentLogs().then((logs:any)=>{
      setCallLogs(logs)
      setIsRefreshing(false )
    }).catch((e)=>{
      console.log(e)
    })
  }

 useEffect(()=>{
  fetchResentLogs()
 },[])

 const refreshHandler =async()=>{
  setIsRefreshing(true)
  setIsRefresh(! isRefresh)
  fetchResentLogs()

 }

  return (
    <CustomSafeAreaView classStyle='px-2 py-1'>
      <View className='flex-row items-center justify-between'>
        <Image source={require('../assets/images/logo_text.png')}
        className='h-6 w-32 resize self-center'
        />
        <UserAvatar onPress={()=>{}} text={getAbbrName(user?.name || "UN")}/>
      </View>
      <FlatList
      keyExtractor={(item:any)=> item.id }
      renderItem={renderCallers}
      data={callLogs}
      refreshControl={
        <RefreshControl
         refreshing={isRefreshing}
         onRefresh={refreshHandler}
        />
      }
      initialNumToRender={5}
      ListEmptyComponent={
        <View className='mt-5 items-center'>
          <View className='rounded-full bg-backgroundLight self-center p-5 '>
           <MagnifyingGlassIcon size={25} color={Colors.text} />
          </View>
          <Text className='mt-2 font-medium text-gray-500'>No Recents Call Logs</Text>
        </View>
      }
      ListHeaderComponent={<DashboardHeader/>}
      windowSize={5}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<ContactList isRefresh={isRefresh}/>}

      />
      <View></View>
    </CustomSafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})