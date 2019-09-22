import firebase from 'react-native-firebase';
import {showAlert} from './AlertService';
import AsyncStorage from '@react-native-community/async-storage';

export async function createNotificationListeners() {
    /*
     * Triggered for data only payload in foreground
     * */
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
        // process data message
        console.log(JSON.stringify(message));
    });

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notifications = firebase.notifications();
    notifications.onNotification((notification) => {
        const {title, body} = notification;
        showAlert(title, body);
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    notifications.onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        showAlert(title, body);
    });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await notifications.getInitialNotification();
    if (notificationOpen) {
        const {title, body} = notificationOpen.notification;
        showAlert(title, body);
    }
}

export async function hasMessagingPermission() {
    return firebase.messaging().hasPermission();
}

export async function getFirebaseToken() {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
        return fcmToken;
    }

    return await firebase.messaging().getToken();
}

export function storeFirebaseToken(token: string) {
    return AsyncStorage.setItem('fcmToken', token);
}

export async function requestMessagingPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
    } catch (error) {
        // User has rejected permissions
        console.error('firebase messaging permission rejected');
    }
}
