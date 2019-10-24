import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {AppPage} from './declarations';
import {IEvent} from './services/EventService';
import {useEvents} from './hooks/useEvents';

import Menu from './components/Menu';
import Home from './pages/Home';
import EventPicker from './pages/EventPicker';
import AnnouncementsPage from './pages/Announcements';
import SchedulePage from './pages/Schedule';
import {home, list} from 'ionicons/icons';

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

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home,
  },
  {
    title: 'Event Picker',
    url: '/event-picker',
    icon: list,
  },
];

interface IContext {
  event: IEvent;
  events: IEvent[];
  updateEvent: () => void;
}

export const EventContext = React.createContext<IContext>({} as IContext);

function App() {
  const {loading, error, preferredEvent, updateEvent, events} = useEvents();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!preferredEvent) {
    return <EventPicker events={events} onPickEvent={updateEvent} />;
  }

  return (
    <EventContext.Provider
      value={{
        events: events,
        event: preferredEvent,
        updateEvent: () => updateEvent(undefined),
      }}
    >
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu appPages={appPages} />
            <IonRouterOutlet id="main">
              <Route path="/home" component={Home} exact={true} />
              <Route path="/event-picker" component={EventPicker} exact={true} />
              <Route path="/announcements" component={AnnouncementsPage} exact={true} />
              <Route path="/schedule" component={SchedulePage} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </EventContext.Provider>
  );
}

export default App;
