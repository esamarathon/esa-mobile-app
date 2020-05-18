import {Plugins} from '@capacitor/core';
const {LocalNotifications} = Plugins;

export async function scheduleNotification(options: any) {
  const notifs = await LocalNotifications.schedule({
    notifications: [
      {
        title: options.title,
        body: options.body,
        id: 1,
        schedule: {at: options.scheduled},
      },
    ],
  });

  console.log('scheduled notifications', notifs);
}
