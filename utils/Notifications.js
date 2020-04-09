import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { removeNotifications, getNotification, setNotification } from "./Storage";

function createNotification() {
  return {
    title: "Take a Quiz!",
    body: "👋 don't forget to take your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function clearLocalNotification() {
  return removeNotifications();
}

export function setLocalNotification() {
  getNotification()
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate());
            tomorrow.setHours(19);
            tomorrow.setMinutes(59);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            setNotification();
          }
        });
      }
    });
}
