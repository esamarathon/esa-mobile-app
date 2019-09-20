import {firebase} from '@react-native-firebase/messaging';
import {showAlert} from './AlertService';
import AsyncStorage from '@react-native-community/async-storage';

// TODO: Pray @react-native-firebase fixes their types because they aint working
export async function createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */

    firebase.notifications().onNotification((notification: Notification) => {
        const {title, body} = notification;
        showAlert(title, body);
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    firebase
        .notifications()
        .onNotificationOpened((notificationOpen: {notification: Notification}) => {
            const {title, body} = notificationOpen.notification;
            showAlert(title, body);
        });

    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage((message: any) => {
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
