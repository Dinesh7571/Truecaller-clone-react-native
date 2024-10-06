import { View, Text, Platform, PermissionsAndroid, FlatList } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import CallerItem from '../ui/CallerItem'
import Contacts from 'react-native-contacts'
import { addMultipleContacts } from '../../service/authService'



const ContactList:FC<{isRefresh:boolean}> = ({isRefresh}) => {

  const [contacts, setContacts] = useState<any>([])

  const renderCallers=({item}:any)=>{
     return <CallerItem isContacts item={item} />
  }

  const fetchContacts=async()=>{
    
    Contacts.getAll().then(async contacts=>{
        const contactSet=new Set()
        const formattedContacts=contacts.map(contact=>{
          return contact.phoneNumbers.map((phone,index)=>{
            const cleanedNumber=phone.number.replace(/[^\d]/g,'')
            const last10Digits=cleanedNumber.slice(-10);

            if(!contactSet.has(last10Digits)){
                contactSet.add(last10Digits)
                return {
                    index:index,
                    phoneNumber:last10Digits,
                    name:contact?.givenName +" "+ contact?.familyName || "",
                    isSpam:false,
                    fraudCount:0

                }
               
            }
            return null;
          }).filter(Boolean)   
        }).flat();

        setContacts(formattedContacts )

        await addMultipleContacts(formattedContacts)
    })
    
  }


  const fetchContactsPermission=async()=>{
    if(Platform.OS==='android'){
        const permission=await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        )
        if(permission===PermissionsAndroid.RESULTS.GRANTED){
            fetchContacts()
        }else{
            console.log("Permisiion Denied")
        }
    }else{
        const permission =await Contacts.requestPermission()
        if(permission=='authorized'){
            fetchContacts()
        }else{
            console.log("Permission Denied")
        }
    }
  }
  
  useEffect(()=>{
     fetchContactsPermission()
  },[isRefresh])


  return (
    <View>
      <Text className='my-4 text-base text-text font-semibold'>Contacts</Text>
      <FlatList
        initialNumToRender={5}
        windowSize={5}
        data={contacts?.slice(0,10) || []}
        keyExtractor={(item:any)=>item.phoneNumber}
        renderItem={renderCallers}
      />
    </View>
  )
}

export default ContactList