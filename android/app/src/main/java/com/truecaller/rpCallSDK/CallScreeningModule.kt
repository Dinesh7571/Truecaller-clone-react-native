/**
 * Author : Ritik Prasad (https://www.youtube.com/@RitikPrasad-lz8fk)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */




package com.truecaller.rpCallSDK

import android.app.Activity
import android.app.role.RoleManager
import android.content.Intent
import android.os.Build
import android.telecom.TelecomManager
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log
import android.Manifest
import android.content.pm.PackageManager
import android.provider.CallLog
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments


class CallScreeningModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    init {
        reactContext.addLifecycleEventListener(this)
        setReactContext(reactContext)
    }

    companion object {
        private var reactContext: ReactApplicationContext? = null

        fun setReactContext(context: ReactApplicationContext) {
            reactContext = context
        }

        fun getReactContext(): ReactApplicationContext? {
            return reactContext
        }

        const val NAME = "CallScreeningModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun showModal(message: String) {
        // Send message to React Native JavaScript side
        val reactContext = getReactContext()
        if (reactContext != null && reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("CallScreeningEvent", message)
        }
    }

    @ReactMethod
    fun requestCallScreeningRole(promise: Promise) {
        val activity: Activity? = currentActivity
        if (activity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val roleManager = activity.getSystemService(RoleManager::class.java)
                if (roleManager != null) {
                    val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                    activity.startActivityForResult(intent, 1)
                    
                    promise.resolve(true)
                } else {
                    promise.reject("RoleManagerError", "RoleManager is not available")
                }
            } else {
                Log.d("RoleManagerError", "RoleManager requires Android Q or higher")
                promise.reject("RoleManagerError", "RoleManager requires Android Q or higher")
            }
        } else {
            promise.reject("ActivityError", "Activity is null")
        }
    }

    @ReactMethod
    fun requestDefaultDialerRole(promise: Promise) {
        val activity: Activity? = currentActivity
        if (activity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
                intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, activity.packageName)
                activity.startActivityForResult(intent, 1)
                promise.resolve(true)
            } else {
                promise.reject("DialerRoleError", "Default Dialer role requires Android M or higher")
            }
        } else {
            promise.reject("ActivityError", "Activity is null")
        }
    }


    @ReactMethod
    fun getRecentLogs(promise: Promise) {
        try {
            val projection = arrayOf(
                CallLog.Calls._ID, CallLog.Calls.NUMBER, CallLog.Calls.TYPE, 
                CallLog.Calls.DURATION, CallLog.Calls.DATE, CallLog.Calls.COUNTRY_ISO
            )
            val sortOrder = "${CallLog.Calls.DATE} DESC"
            val cursor = reactContext?.contentResolver?.query(
                CallLog.Calls.CONTENT_URI,
                projection,
                null,
                null,
                sortOrder
            )

            if (cursor != null && cursor.moveToFirst()) {
                val result = Arguments.createArray()
                val numberIndex = cursor.getColumnIndex(CallLog.Calls.NUMBER)
                val typeIndex = cursor.getColumnIndex(CallLog.Calls.TYPE)
                val dateIndex = cursor.getColumnIndex(CallLog.Calls.DATE)
                val durationIndex = cursor.getColumnIndex(CallLog.Calls.DURATION)
                val countryIsoIndex = cursor.getColumnIndex(CallLog.Calls.COUNTRY_ISO)

                var count = 0
                do {
                    if (count >= 5) break
                    val callLog = Arguments.createMap()
                    callLog.putString("number", cursor.getString(numberIndex))
                    callLog.putInt("type", cursor.getInt(typeIndex))
                    callLog.putDouble("date", cursor.getLong(dateIndex).toDouble())
                    callLog.putInt("duration", cursor.getInt(durationIndex))
                    callLog.putString("countryIso", cursor.getString(countryIsoIndex))
                    result.pushMap(callLog)
                    count++
                } while (cursor.moveToNext())

                cursor.close()
                promise.resolve(result)
            } else {
                promise.reject("Error", "No call logs found")
            }
        } catch (e: Exception) {
            promise.reject("Exception", e.message)
        }
    }
    
    // Implement LifecycleEventListener methods
    override fun onHostResume() {
    }

    override fun onHostPause() {
    }

    override fun onHostDestroy() {
    }
}
