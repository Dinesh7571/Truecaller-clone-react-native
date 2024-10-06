import { Alert, Image, Keyboard ,Text, View ,ScrollView} from 'react-native'
import React, { FC, useState } from 'react'
import CustomSafeAreaView from '../components/global/CustomSafeAreaView'
import CustomInput from '../components/ui/CustomInput'
import CustomButton from '../components/ui/CustomButton'
import {  signup } from '../service/authService'
import {  resetAndNavigate } from '../utils/NavigationUtils'
import { RouteProp, useRoute } from '@react-navigation/native'


type RegisterScreenRoute={
  phone:number
}

type RegisterScreenRouteProp=RouteProp<{RegisterScreen:RegisterScreenRoute},'RegisterScreen'>

const RegisterScreen:FC = () => {
const route = useRoute<RegisterScreenRouteProp>()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading]=useState(false)
  
  const handleRegister=async()=>{
    Keyboard.dismiss()
    setLoading(true)
    let name= firstName+" "+lastName
    try {
      console.log(route.params.phone,email,name)
      await signup(route.params.phone,email,name)
      resetAndNavigate('DashboardScreen')
    } catch (error) {
      Alert.alert("There was an error")
    }finally{
      setLoading(false)
    }
    
  }

  return (
    
      <CustomSafeAreaView classStyle='py-2 px-2'>
        <ScrollView contentContainerStyle={{flex:1}}>
        <Image source={require('../assets/logo_text.png')}
        className='h-6 w-32 resize self-center '
        />
        <Text className='mt-6 font-semibold text-lg text-text'>Ceate Profile</Text>
        <Text className='mb-8 mt-2  text-md text-text'>Your name and profile picture will be used for caller Id and profile details</Text>

        <CustomInput
        label='Email'
        value={email}
        keyboardType='email-address'
        placeholder='Your email address'
        onChangeText={setEmail}
        />
         <CustomInput
        label='First Name'
        value={firstName}
        placeholder='Your first name'
        onChangeText={setFirstName}
        />

       <CustomInput
        label='Last Name'
        value={lastName}
        placeholder='Your last name'
        onChangeText={setLastName}
        />

        <View className='mt-8 w-full self-center' >
          <CustomButton
           title='Continue'
           onPress={handleRegister}
           loading={loading}
          />

        </View>
        </ScrollView>
      </CustomSafeAreaView>
     
    
  )
}

export default RegisterScreen

