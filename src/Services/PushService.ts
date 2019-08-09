import firebase from 'react-native-firebase';
import {showAlert} from './AlertService';
import AsyncStorage from '@react-native-community/async-storage';

export async function createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    firebase.notifications().onNotification((notification) => {
        const {title, body} = notification;
        showAlert(title, body);
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    firebase.notifications().onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        showAlert(title, body);
    });

    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage((message) => {
        // process data message
        console.log(JSON.stringify(message));
    });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const {title, body} = notificationOpen.notification;
        showAlert(title, body);
    }
}

export async function hasPermission() {
    return firebase.messaging().hasPermission();
}

export async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
        return fcmToken;
    }

    return await firebase.messaging().getToken();
}

export function storeToken(token: string) {
    return AsyncStorage.setItem('fcmToken', token);
}

export async function requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
    } catch (error) {
        // User has rejected permissions
        console.error('firebase messaging permission rejected');
    }
}
