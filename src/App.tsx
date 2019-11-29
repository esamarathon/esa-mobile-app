import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import useSWR from 'swr';
import {LoadEvents} from './services/EventService';
import {usePersistent} from './hooks/usePersistent';
import MenuBar from './components/MenuBar';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import EventPickerPage from './pages/EventPickerPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SchedulePage from './pages/SchedulePage';

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
import './theme/override.css';

const Themes = {
  default: {
    primaryColor: '#C670D0',
    secondaryColor: '#5273BA',
    accentColor: '#6DA2D7',
    shadowColor: '#881AE8',
    primaryGradient: 'linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #EEEEEE',
    highlight: '#FFBD17',
  },
  summer: {
    primaryColor: '#C670D0',
    secondaryColor: '#5273BA',
    accentColor: '#6DA2D7',
    shadowColor: '#881AE8',
    primaryGradient: 'linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #EEEEEE',
    highlight: '#FFBD17',
  },
  winter: {
    primaryColor: '#99E1F7',
    secondaryColor: '#5273BA',
    accentColor: '#6DA2D7',
    shadowColor: '#1C2175',
    primaryGradient: 'linear-gradient(108.91deg, #99E1F7 -10.47%, #6596D1 96.17%), #EEEEEE',
    highlight: '#FFBD17',
  },
} as const;

function App() {
  const {error, data: events} = useSWR(
    'https://api.submissions.esamarathon.com/events',
    LoadEvents,
  );
  const [currentEventID, setCurrentEventID] = usePersistent<string | undefined>('preferred_event');

  if (!events) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  const currentEvent = events.find((event) => event._id === currentEventID);
  if (!currentEvent) {
    return (
      <EventPickerPage events={events} onPickEvent={(event) => setCurrentEventID(event._id)} />
    );
  }

  const theme = Themes[currentEvent.meta.theme];

  return (
    <ThemeProvider theme={theme}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <MenuBar event={currentEvent} onClearEvent={() => setCurrentEventID(undefined)} />
            <IonRouterOutlet id="main">
              <Route
                path="/home"
                render={(props) => <HomePage {...props} event={currentEvent} />}
              />
              <Route path="/announcements" render={(props) => <AnnouncementsPage {...props} />} />
              <Route path="/schedule" render={(props) => <SchedulePage {...props} />} />
              <Redirect from="/" to="/home" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </ThemeProvider>
  );
}

export default App;
