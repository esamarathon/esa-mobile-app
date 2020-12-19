import {IRun} from './ScheduleService';

export interface IBookmark {
  run: IRun;
  notificationId: string;
}

export function getBookmark(runId: string) {
  const item = localStorage.getItem(`ESA@notification-${runId}`);
  if (!item) {
    return undefined;
  }

  return JSON.parse(item) as IBookmark;
}

export function getBookmarks() {
  return Object.keys(localStorage).reduce((bookmarks, key) => {
    if (key.startsWith('ESA@notification-')) {
      const storedNotification = localStorage.getItem(key);

      try {
        if (storedNotification != null && storedNotification !== '') {
          const bookmark = JSON.parse(storedNotification) as IBookmark;

          // Only show bookmark if run is yet to be played,
          // as we currently do not purge localstorage after notifications happen.
          if (!bookmark.run.id) {
            throw new Error('Bookmark has not run ID');
          }

          bookmarks.set(bookmark.run.id, bookmark);
        }
      } catch (error) {
        console.warn('Invalid notification storage, just ignoring the data', error);
      }
    }

    return bookmarks;
  }, new Map<string, IBookmark>());
}

export function storeBookmark(details: IBookmark) {
  localStorage.setItem(`ESA@notification-${details.run.id}`, JSON.stringify(details));
}

export function isBookmarked(runId: string) {
  return !!localStorage.getItem(`ESA@notification-${runId}`);
}

export function removeBookmark(runId: string) {
  localStorage.removeItem(`ESA@notification-${runId}`);
}
