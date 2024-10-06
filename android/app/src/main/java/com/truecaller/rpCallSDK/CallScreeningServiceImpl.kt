/**
 * Author : Ritik Prasad (https://www.youtube.com/@RitikPrasad-lz8fk)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


package com.truecaller.rpCallSDK
import com.truecaller.rpCallSDK.CallBackgroundMessaging
import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.content.Intent
import android.app.ActivityManager
import android.content.Context

class CallScreeningServiceImpl : CallScreeningService() {

    private fun sendToReactNative(message: String) {
        val reactContext = CallScreeningModule.getReactContext()
        if (reactContext != null && reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("CallScreeningEvent", message)
        }
    }

    companion object {
        private const val TAG = "CallScreeningServiceImpl"
    }

    override fun onScreenCall(callDetails: Call.Details) {
        val phoneNumber = callDetails.handle.schemeSpecificPart
        Log.d(TAG, "Incoming call from: $phoneNumber")
        
        // Send message to React Native
        sendToReactNative("Incoming call from: $phoneNumber")
        if (isAppInBackground()) {
            triggerHeadlessJs(phoneNumber)
        }
        val response = CallResponse.Builder()
            .setDisallowCall(false)
            .setRejectCall(false)
            .setSilenceCall(false)
            .setSkipCallLog(false)
            .setSkipNotification(false)
            .build()

        respondToCall(callDetails, response)
    }

 
    private fun triggerHeadlessJs(phoneNumber: String) {
        val intent = Intent(this, CallBackgroundMessaging::class.java)
        intent.putExtra("phoneNumber", phoneNumber)
        startService(intent)
    }

        // Check if app is in background
        private fun isAppInBackground(): Boolean {
            val activityManager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            val appProcesses = activityManager.runningAppProcesses ?: return true
    
            for (appProcess in appProcesses) {
                if (appProcess.processName == packageName) {
                    return appProcess.importance != ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                }
            }
            return true
        }


}
