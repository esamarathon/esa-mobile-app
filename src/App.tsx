import React, {useState, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {AppPage} from './declarations';
import {LoadEvents, IEvent} from './services/EventService';

import Menu from './components/Menu';
import Home from './pages/Home';
import EventPicker from './pages/EventPicker';
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
  const [preferredEvent, setPreferredEvent] = useState<IEvent>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        setLoading(true);

        const events = await LoadEvents();

        if (!cancelled) {
          setEvents(events);
          setPreferredEvent(events[0]);
        }
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!preferredEvent) {
    return <EventPicker />;
  }

  return (
    <EventContext.Provider
      value={{
        events: events,
        event: preferredEvent,
        updateEvent: () => setPreferredEvent(undefined),
      }}
    >
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu appPages={appPages} />
            <IonRouterOutlet id="main">
              <Route path="/home" component={Home} exact={true} />
              <Route path="/event-picker" component={EventPicker} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </EventContext.Provider>
  );
}

export default App;
