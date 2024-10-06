import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { findUser } from '../../service/authService';
import { getAbbrName } from '../../utils/miscUtils';
import { navigate } from '../../utils/NavigationUtils';
import UserAvatar from './UserAvatar';
import { formatPhoneNumber } from '../../utils/Constants';
import { ChevronRightIcon } from 'react-native-heroicons/outline';



const CallerItem:FC<{item:any; isContacts?:boolean}> = ({item,isContacts}) => {
  const [dbUser,setdbUser]=useState<any>()
  const fetchFormDb=async()=>{

    try {
        const data =await findUser(item?.phoneNumber)
        
        setdbUser(data)
    } catch (error) {
        setdbUser(item)
        console.log(error)
    }
  }

 useEffect(()=>{
    fetchFormDb()
 },[])

 const name= dbUser?.name  ?  getAbbrName(dbUser?.name):"UN"


  return (
  <TouchableOpacity 
  onPress={()=>navigate('CallerScreen',{item:dbUser})}
  className='mb-4 flex-row items-center justify-between'
  >
    <View className='flex-row items-center space-x-2'>
     <UserAvatar 
     isSpam={dbUser?.isSpam}
     onPress={()=>navigate('CallerScreen',{item:dbUser})}
     text={name.toUpperCase( )}
     />
     <View className='w-56 space-y-1 '>
      
       <Text className='text-md text-text  font-semibold'> {dbUser?.name || "Unknown"}</Text>
       <Text className='text-xs text-text  font-semibold'> {dbUser?.isSpam ?"⛔":  "🔎"}
       <Text>{" "}{formatPhoneNumber(item?.phoneNumber?.toString() )}{!isContacts && " • " + item?.formattedDate}</Text>
       </Text>
     </View>
    </View>
    <ChevronRightIcon size={20} color={"#aaa"}/> 
  </TouchableOpacity>
  )
}

export default CallerItem