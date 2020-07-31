import {Plugins} from '@capacitor/core';
const {LocalNotifications} = Plugins;

export function cancelNotification(notificationId: string) {
  return LocalNotifications.cancel({
    notifications: [{id: notificationId}],
  });
}

export function scheduleNotification(options: {title: string; body: string; scheduled: Date}) {
  const storedNotificationId = localStorage.getItem('ESA@notificationId');

  let notificationId = 0;
  try {
    if (storedNotificationId !== null && storedNotificationId !== '') {
      notificationId = parseInt(JSON.parse(storedNotificationId)) + 1;
    }
  } catch (error) {
    console.warn('Invalid notification id stored, resetting to 0');
  }

  localStorage.setItem('ESA@notificationId', JSON.stringify(notificationId));

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
