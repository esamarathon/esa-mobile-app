import {useEffect, useState} from 'react';
import {IEvent, LoadEvents} from '../services/EventService';

const PREFERRED_EVENT_ID_KEY = '@ESA:preferredEventId';

export function useEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [preferredEvent, setPreferredEvent] = useState<IEvent | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function updateEvent(event: IEvent | undefined) {
    setPreferredEvent(event);

    await localStorage.setItem(PREFERRED_EVENT_ID_KEY, event ? event._id : 'undefined');
  }

  useEffect(() => {
    async function updateEvents() {
      try {
        const fetchedEvents = await LoadEvents();
        setEvents(fetchedEvents);

        const preferredEventId = await localStorage.getItem(PREFERRED_EVENT_ID_KEY);
        const preferredEvent = preferredEventId
          ? fetchedEvents.find((event) => event._id === preferredEventId)
          : undefined;
        updateEvent(preferredEvent);
      } catch (error) {
        console.error(error);

        setError(error);
      } finally {
        setLoading(false);
      }
    }

    updateEvents();
  }, []);

  return {
    events,
    preferredEvent,
    updateEvent,
    loading,
    error,
  };
}
