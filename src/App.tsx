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

interface IContext {
  event: IEvent;
  events: IEvent[];
  runs: IRun[];
  updatePreferredEvent: (event?: IEvent) => void;
}

export const EventContext = React.createContext<IContext>({} as IContext);

function App() {
  const {
    loading: eventsLoading,
    error: eventsError,
    preferredEvent,
    updatePreferredEvent,
    events,
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

  return (
    <EventContext.Provider
      value={{
        event: preferredEvent,
        runs,
        events,
        updatePreferredEvent,
      }}
    >
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
    </EventContext.Provider>
  );
}

export default App;
