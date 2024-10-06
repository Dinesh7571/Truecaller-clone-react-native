package com.truecaller.rpCallSDK

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.facebook.react.jstasks.HeadlessJsTaskRetryPolicy
import com.facebook.react.jstasks.LinearCountingRetryPolicy
import android.app.Service
import android.os.IBinder

class CallBackgroundMessaging : HeadlessJsTaskService() {

 

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        val extras: Bundle? = intent.extras
        val phoneNumber = extras?.getString("phoneNumber")

        Log.d("CallBackgroundMessaging", "Handling phone number: $phoneNumber")

        val retryPolicy = LinearCountingRetryPolicy(
            5, // Max number of retry attempts
            500 // Delay between each retry attempt
        )

        return HeadlessJsTaskConfig(
            "CallBackgroundMessaging",
            Arguments.fromBundle(extras),
            60000,
            false,
            retryPolicy
        )
    }
  
    // override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
    //     val phoneNumber = intent.getStringExtra("phoneNumber") ?: return START_NOT_STICKY
        
    //     // Start the overlay activity
    //     val overlayIntent = Intent(this, CallOverlayActivity::class.java)
    //     overlayIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    //     overlayIntent.putExtra("phoneNumber", phoneNumber)
    //     startActivity(overlayIntent)
        
    //     return START_NOT_STICKY
    // }

    // override fun onBind(intent: Intent?): IBinder? {
    //     return null
    // }


}



