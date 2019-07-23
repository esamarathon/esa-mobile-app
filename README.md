# ESA Mobile App

## Getting started
To get started with the project, simply clone the project and follow the [Getting Started](https://facebook.github.io/react-native/docs/getting-started) guide. This project uses the React Native CLI and *not* the Expo CLI.
Select your OS and what platform you want to build to. **Beware that iOS requires a mac environment.**

## Contributing
To contribute to this project you can submit pull requests or create issues on this repo. If you want to get more information or help you can join the ESA Marathon Discord channel. A link to this and other social media can be found on the website https://esamarathon.com/

## Building
To build an unsigned Android APK follow these steps
* First bundle the Javascript to Android from the root folder `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
* `cd android`
* Build the APK with the bundled Javascript `./gradlew assembleDebug`
* `adb install app/build/outputs/apk/debug/app-debug.apk`

This should install the app on your phone
