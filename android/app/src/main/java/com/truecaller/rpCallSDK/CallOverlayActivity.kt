package com.truecaller.rpCallSDK

import android.annotation.SuppressLint
import android.app.Activity
import android.graphics.PixelFormat
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView
import androidx.annotation.RequiresApi
import com.truecaller.R

class CallOverlayActivity : Activity() {
    @SuppressLint("SetTextI18n")
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_call_overlay)

        // Set layout parameters to make the activity overlay on top of other apps
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
            PixelFormat.TRANSLUCENT
        )
        window.attributes = params

        val phoneNumber = intent.getStringExtra("phoneNumber") ?: "Unknown"
        val textView: TextView = findViewById(R.id.textView)
        textView.text = "Incoming call from $phoneNumber"

        val closeButton: Button = findViewById(R.id.closeButton)
        closeButton.setOnClickListener {
            finish()  // Close the overlay activity
        }
    }
}
