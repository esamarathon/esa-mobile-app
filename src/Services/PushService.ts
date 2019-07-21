import firebase from 'react-native-firebase';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let notificationListener;
let notificationOpenedListener;
let messageListener;

export async function createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    notificationListener = firebase.notifications().onNotification((notification) => {
        const {title, body} = notification;
        showAlert(title, body);
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened((notificationOpen) => {
            const {title, body} = notificationOpen.notification;
            showAlert(title, body);
        });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const {title, body} = notificationOpen.notification;
        showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
    });
}

function showAlert(title: string, body: string) {
    Alert.alert(title, body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], {
        cancelable: false,
    });
}

export async function checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
}

export async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
}

export async function requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
}
