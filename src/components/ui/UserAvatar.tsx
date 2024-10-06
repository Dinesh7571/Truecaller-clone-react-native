import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

interface UserAvatarProps{
    text:string,
    onPress:()=>void,
    isSpam?:boolean
}

const UserAvatar:FC <UserAvatarProps>= ({text,onPress,isSpam}) => {
const border= `${isSpam? 'border-error':'border-primary'}`
const bg= `${isSpam? 'bg-red-100':'bg-backgroundLight'}`
const textColor = `${isSpam? 'text-red-500':'text-primary'}`
  return (
    <TouchableOpacity onPress={onPress} className={`${border} ${bg} border-2 rounded-full h-14 w-14  justify-center items-center `}>
      <Text className={`${textColor} text-lg font-semibold`}>{text}</Text>
    </TouchableOpacity>
  )
}

export default UserAvatar