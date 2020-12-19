import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import useSWR from 'swr';
import {Plugins} from '@capacitor/core';
import {loadFromESASubmissions} from './services/EventService';
import {usePersistent} from './hooks/usePersistent';
import MenuBar from './components/MenuBar';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import EventPickerPage from './pages/EventPickerPage';
import SchedulePage from './pages/SchedulePage';
import BookmarkPage from './pages/BookmarksPage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */

import './theme/variables.css';

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

function App() {
  const {error, data: events, isValidating} = useSWR('/events', loadFromESASubmissions);
  const [selectedEventID, setSelectedEvent] = usePersistent<string | undefined>('preferred_event');

  useEffect(() => {
    Plugins.SplashScreen.hide();
  }, []);

  if (isValidating) {
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
  const theme = Themes[selectedEvent.meta.theme];

  return (
    <ThemeProvider theme={theme}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <MenuBar event={selectedEvent} onClearEvent={() => setSelectedEvent(undefined)} />
            <IonRouterOutlet id="main">
              <Route
                path="/home"
                render={(props) => <HomePage {...props} event={selectedEvent} />}
              />
              <Route path="/bookmarks" render={(props) => <BookmarkPage {...props} />} />
              <Route
                path="/schedule"
                render={(props) => <SchedulePage {...props} event={selectedEvent} />}
              />
              <Redirect from="/" to="/home" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </ThemeProvider>
  );
}

export default App;
