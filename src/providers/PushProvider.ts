import {Plugins} from '@capacitor/core';
const {LocalNotifications} = Plugins;

let notificationId = 1;

export function cancelNotification(runId: number) {
  LocalNotifications.cancel({
    notifications: [{id: `${runId}`}],
  });
}

export async function scheduleNotification(options: any) {
  if (localStorage.getItem('ESA@notificationId')) {
    notificationId = parseInt(JSON.parse(localStorage.getItem('ESA@notificationId') as string));
    notificationId++;
  } else {
    notificationId++;
    localStorage.setItem('ESA@notificationId', JSON.stringify(notificationId));
  }

  return LocalNotifications.schedule({
    notifications: [
      {
        title: options.title,
        body: options.body,
        id: notificationId,
        schedule: {at: options.scheduled},
      },
    ],
  });
}
