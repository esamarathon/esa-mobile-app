import {IRun} from './ScheduleService';
import dayjs from 'dayjs';

export interface IBookmark {
  run: IRun;
  notificationId: string;
}

export function IsBookmarked(runId: string) {
  return localStorage.getItem(`ESA@notification-${runId}`) != null;
}

export function GetBookmark(runId: string) {
  return GetBookmarks().find((bookmark) => bookmark.run.id === runId);
}

export function GetBookmarks() {
  return Object.keys(localStorage).reduce<IBookmark[]>((bookmarks, key) => {
    if (key.startsWith('ESA@notification-')) {
      const storedNotification = localStorage.getItem(key);

      try {
        if (storedNotification != null && storedNotification !== '') {
          const bookmark = JSON.parse(storedNotification) as IBookmark;

          // Only show bookmark if run is yet to be played,
          // as we currently do not purge localstorage after notifications happen.
          if (dayjs(bookmark.run.scheduled).isAfter(dayjs())) {
            bookmarks.push(bookmark);
          } else {
            RemoveBookmark(bookmark.run.id);
          }
        }
      } catch (error) {
        console.warn('Invalid notification storage, just ignoring the data');
      }
    }

    return bookmarks;
  }, []);
}

export function StoreBookmark(details: IBookmark) {
  localStorage.setItem(`ESA@notification-${details.run.id}`, JSON.stringify(details));
}

export function RemoveBookmark(runId: string) {
  localStorage.removeItem(`ESA@notification-${runId}`);
}
