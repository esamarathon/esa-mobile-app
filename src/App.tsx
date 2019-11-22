import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {IEvent} from './services/EventService';
import {IRun} from './services/ScheduleService';
import {useEvents} from './hooks/useEvents';
import {useSchedule} from './hooks/useSchedule';
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
import {ThemeProvider} from 'styled-components';

interface IContext {
  event: IEvent;
  events: IEvent[];
  runs: IRun[];
  updatePreferredEvent: (event?: IEvent) => void;
}

const Themes: any = {
  default: {},
  summer: {
    primaryColor: '#99E1F7',
    secondaryColor: '#5273BA',
    accentColor: '#6DA2D7',
    shadowColor: '#1C2175',
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
};

export const EventContext = React.createContext<IContext>({} as IContext);

function App() {
  const {
    loading: eventsLoading,
    error: eventsError,
    preferredEvent,
    updatePreferredEvent,
    events,
    theme,
  } = useEvents();
  const {loading: scheduleLoading, runs} = useSchedule(preferredEvent);

  if (eventsLoading) {
    return <LoadingPage />;
  }

  if (eventsError) {
    return <p>Something went wrong...</p>;
  }

  if (!preferredEvent) {
    return <EventPickerPage events={events} onPickEvent={updatePreferredEvent} />;
  }

  // This loading component needs to be put it under the event picker,
  // because the schedule fetching hook needs an event to fetch the schedule
  if (scheduleLoading) {
    return <LoadingPage />;
  }

  function themeSelector() {
    return Themes[theme];
  }

  return (
    <EventContext.Provider
      value={{
        event: preferredEvent,
        runs,
        events,
        updatePreferredEvent,
      }}
    >
      <ThemeProvider theme={themeSelector()}>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <MenuBar />
              <IonRouterOutlet id="main">
                <Route path="/home" component={HomePage} />
                <Route path="/announcements" component={AnnouncementsPage} />
                <Route path="/schedule" component={SchedulePage} />
                <Redirect from="/" to="/home" exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </ThemeProvider>
    </EventContext.Provider>
  );
}

export default App;
