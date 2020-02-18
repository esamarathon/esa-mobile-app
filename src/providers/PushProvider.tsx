import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const {PushNotifications} = Plugins;

export function PushProvider() {
  // Register with Apple / Google to receive push via APNS/FCM
  PushNotifications.register();

  // On succcess, we should be able to receive notifications
  PushNotifications.addListener('registration', (token: PushNotificationToken) => {
    console.log('Push registration success, token: ' + token.value);
  });

  // Some issue with your setup and push will not work
  PushNotifications.addListener('registrationError', (error: any) => {
    console.log('Error on registration: ' + JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
    console.log(notification);
  });

  // Method called when tapping on a notification
  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: PushNotificationActionPerformed) => {
      console.log(notification);
    },
  );
}
