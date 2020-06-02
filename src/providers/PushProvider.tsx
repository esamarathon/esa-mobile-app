import {Plugins} from '@capacitor/core';
const {LocalNotifications} = Plugins;

let someNumber = 0;

export async function scheduleNotification(options: any) {
  const notifs = await LocalNotifications.schedule({
    notifications: [
      {
        title: options.title,
        body: options.body,
        id: someNumber++,
        schedule: {at: options.scheduled},
      },
    ],
  });

  console.log('scheduled notifications', notifs);
}
