/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { findUser } from './src/service/authService';
import { storage } from './src/state/storage';
import notifee from '@notifee/react-native'

notifee.onForegroundEvent(({type,details })=>{})
notifee.onBackgroundEvent(({type,details })=>{})


async function onDisplayNotification(user){
    await notifee.requestPermission()
    const channelId=await notifee.createChannel({
        id:'default',
        name:'Default Channel'
    })
    await notifee.displayNotification({
        title:`Call From ${user?.name|| "Unknown"}  `,
        body:`${user?.phoneNumber}`,
        android:{
            channelId,
            smallIcon:'ic_stat_name',
                  
        },
    });
}

const handleIncomingCall=async data=>{
    const accessToken=storage.getString('accessToken')
    if(accessToken){
     const phoneNumber=data.phoneNumber
     const cleanedNumber=phoneNumber.replace(/[^\d]/g,'')
     const last10Digit=cleanedNumber.slice(-10)
     const user =await findUser(last10Digit)
     onDisplayNotification(user)
    }
     

}

AppRegistry.registerComponent(appName, () => App);


AppRegistry.registerHeadlessTask(
    'CallBackgroundMessaging',
    ()=> handleIncomingCall,
)