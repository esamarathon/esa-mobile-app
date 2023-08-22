import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {SplashScreen} from '@capacitor/splash-screen';
import {loadFromESASubmissions} from './services/EventService';
import {IRun} from './services/ScheduleService';
import {
  getBookmark,
  getBookmarks,
  IBookmark,
  isBookmarked,
  removeBookmark,
  storeBookmark,
} from './services/BookmarkService';
import {usePersistent} from './hooks/usePersistent';
import MenuBar from './components/MenuBar';
import {cancelNotification, scheduleNotification} from './providers/PushProvider';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import EventPickerPage from './pages/EventPickerPage';
import SchedulePage from './pages/SchedulePage';
import BookmarkPage from './pages/BookmarksPage';

// Core CSS
import './global.css';

const Themes = {
  default: {
    primaryColor: '#C670D0',
    secondaryColor: '#881AE8',
    accentColor: '#881AE8',
    shadowColor: '#C670D0',
    primaryGradient: 'linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #EEEEEE',
    highlight: '#FFBD17',
  },
  summer: {
    primaryColor: '#C670D0',
    secondaryColor: '#881AE8',
    accentColor: '#C670D0',
    shadowColor: '#881AE8',
    primaryGradient: 'linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #EEEEEE',
    highlight: '#FFBD17',
  },
  winter: {
    primaryColor: '#99E1F7',
    secondaryColor: '#6596D1',
    accentColor: '#6DA2D7',
    shadowColor: '#1C2175',
    primaryGradient:
      'linear-gradient(149.25deg, #99E1F7 -10.47%, #6596D1 41.18%, #5273BA 96.17%), #EEEEEE;',
    highlight: '#FFBD17',
  },
} as const;

export interface IBookmarkContext {
  bookmarks: Map<string, IBookmark>;
  onBookmark: (run: IRun) => void;
}

export const BookmarkContext = createContext<IBookmarkContext | null>(null);

function App() {
  const {error, data: events, status} = useQuery({queryKey: ['events'], queryFn: loadFromESASubmissions});

  const [selectedEventID, setSelectedEvent] = usePersistent<string | undefined>('preferred_event');
  const [menuState, setMenuState] = useState(false);
  const [bookmarkContext, setBookmarkContext] = useState<IBookmarkContext>(() => ({
    bookmarks: getBookmarks(),
    onBookmark,
  }));

  async function onBookmark(run: IRun) {
    if (!run.id) {
      console.warn('Trying to bookmark a run without an ID');
      return;
    }

    if (isBookmarked(run.id)) {
      removeBookmark(run.id);

      const bookmark = getBookmark(run.id);
      if (bookmark) {
        await cancelNotification(bookmark.notificationId);
      }
    } else {
      const {notifications} = await scheduleNotification({
        title: 'Your run is about to start!',
        body: `In about an hour ${run.game} - ${run.category} starts`,
        scheduled: dayjs(run.scheduled).subtract(1, 'hour').toDate(),
      });

      storeBookmark({run, notificationId: notifications[0].id});
    }

    setBookmarkContext((value) => ({
      ...value,
      bookmarks: getBookmarks(),
    }));
  }

  useEffect(() => {
    SplashScreen.hide().then((r) => r);
  }, []);

  if (status === 'pending') {
    return <LoadingPage />;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!events) {
    return <p>No events found</p>;
  }

  const selectedEvent = selectedEventID
    ? events.find((event) => event._id === selectedEventID)
    : undefined;

  if (!selectedEvent) {
    return <EventPickerPage events={events} onPickEvent={(event) => setSelectedEvent(event._id)} />;
  }

  // Set theme to default if unknown
  selectedEvent.meta.theme =
    selectedEvent.meta.theme && selectedEvent.meta.theme in Themes
      ? selectedEvent.meta.theme
      : 'default';

  const theme = createTheme({
    palette: {
      primary: {
        main: Themes[selectedEvent.meta.theme].primaryColor,
      },
      secondary: {
        main: Themes[selectedEvent.meta.theme].secondaryColor,
      },
      info: {
        main: Themes[selectedEvent.meta.theme].accentColor,
      },
      warning: {
        main: Themes[selectedEvent.meta.theme].shadowColor,
      },
      background: {
        default: Themes[selectedEvent.meta.theme].primaryGradient,
      },
    },
    typography: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(','),
    },
  });

  function handleMenuState(newState: boolean) {
    setMenuState(newState);
  }

  return (
    <ThemeProvider theme={theme}>
      <BookmarkContext.Provider value={bookmarkContext}>
        <BrowserRouter>
          <MenuBar
            event={selectedEvent}
            onClearEvent={() => setSelectedEvent(undefined)}
            menuState={menuState}
            handleMenuState={handleMenuState}
          />
          <Routes>
            <Route path="/" element={<HomePage event={selectedEvent} />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
            <Route path="/schedule" element={<SchedulePage event={selectedEvent} />} />
          </Routes>
        </BrowserRouter>
      </BookmarkContext.Provider>
    </ThemeProvider>
  );
}

export default App;
