

# Truecaller Clone - Full Stack React Native | Node js backend
## React native (old architecture) native module integration 

## 👇Click Here to Watch Demo 

[![Baymax Demo](https://imgs.search.brave.com/rZiCbAt6q-731hHgw7FiUQA-j5NEm41ySq94-3RBFPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2VuZGlibGUuY29t/L2h1YmZzL0ltcG9y/dGVkX0Jsb2dfTWVk/aWEvc20taWNvbnMt/eW91dHViZS5wbmc)](https://youtu.be/J-DBm1FjPKU?si=EBFUg7Lj1b3PM0FZ)




## Showcase Screenshots



![Truecaller clone Features](showcase/1.png)
![Truecaller clone](showcase/2.png)
![Truecaller clone](showcase/3.png)




---

A **Truecaller clone** that demonstrates advanced integration of React Native and Kotlin native modules. This app is designed to detect incoming calls, display caller ID, screen spam. It's a hands-on learning project  , featuring robust call detection and spam filtering mechanisms.

## Features

- **Call Detection**: Detect incoming and outgoing calls with real-time notifications.
- **Caller ID & Spam Detection**: Identify caller details and check for spam numbers.
- **Kill Mode**: Activate headless JS task to run background processes for enhanced performance and call handling.
- **React Native & Kotlin Bridge**: Utilize Kotlin for Android-specific functionalities and integrate with React Native.
- **Push Notifications**: Implement **Notifee** for enhanced push notifications during call events.
- **State Management**: Handle app state efficiently with **Zustand**.

## Tech Stack

- **React Native CLI**: Build the app with native Android functionalities.
- **Kotlin Native Modules**: Integrate Android-specific features via Kotlin.
- **Node.js & MongoDB**: Backend API for managing and storing user data.
- **Zustand**: Lightweight state management for React Native.
- **Call Detection & Screening**: Use SDK Call Kotlin for monitoring incoming calls.
- **Notifee**: Advanced notifications for call and spam alerts.
- **Headless JS**: Background processing for Kill Mode.

## Usage

- Upon launch, the app listens for incoming and outgoing calls.
- Displays caller information and flags spam calls based on the number’s reputation.
- Utilize the "Kill Mode" for advanced call screening and background task execution.


## HOW TO RUN LOCALLY


SETUP ENVIRONMENT GUIDE

[﻿https://reactnative.dev/docs/set-up-your-environment?](https://reactnative.dev/docs/set-up-your-environment?) 

## ✅ Environment Requirements
- **Node.js**: `>=18.18.0` 
 _(I Am using _`_v22.12.0_` _, which is compatible.)_
- **JDK**: `17` 
- **CLI**: Use **Bash** for all commands
- android studio


##  Environment Setup Guide
### 1. Clone the Repository
```bash
git clone https://github.com/Dinesh7571/Truecaller-clone-react-native
cd Truecaller-clone-react-native
```
---

### 2. Install Dependencies
```bash
npm install
```
---

### 3. Grant Permission to `gradlew` 
In the project root directory, run:

```bash
chmod +x android/gradlew
```
---

### 4. Run the App
Run the following command to build and install the app on Android (this may take some time to generate native code):

```bash
npx react-native run-android
```
>  ⚠️ This command **may fail** the first time. If it does, continue to the next step. 

---

### 5. Start Metro Bundler (if previous step fails)
```bash
npx react-native start
```
Once the bundler is running, press:

```
a
```
>  This will launch the app on an **Android emulator or physical device**. 

---

### 📱 Using a Physical Android Device?
- Make sure **USB debugging** is turned **ON** on your device.
- Confirm your device is connected using:
```bash
adb devices
```
>  If your device is listed, you're good to go! 







## Contact
Kannaujiya00000@gmail.com

## Contributing

Feel free to fork this repository and contribute by submitting a pull request.

## License

This project is licensed under the MIT License.

