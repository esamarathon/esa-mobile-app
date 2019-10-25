import {useEffect, useState} from 'react';
import {IEvent, LoadEvents} from '../services/EventService';

const PREFERRED_EVENT_ID_KEY = '@ESA:preferredEventId';

export function useEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [preferredEvent, setPreferredEvent] = useState<IEvent>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  async function updatePreferredEvent(event?: IEvent) {
    setPreferredEvent(event);

    localStorage.setItem(PREFERRED_EVENT_ID_KEY, event ? event._id : 'undefined');
  }

  useEffect(() => {
    let cancelled = false;

    async function updateEvents() {
      try {
        setLoading(true);
        setError(undefined);

        const fetchedEvents = await LoadEvents();

        if (!cancelled) {
          setEvents(fetchedEvents);

          const preferredEventId = localStorage.getItem(PREFERRED_EVENT_ID_KEY);
          const preferredEvent = preferredEventId
            ? fetchedEvents.find((event) => event._id === preferredEventId)
            : undefined;

          setPreferredEvent(preferredEvent);
        }
      } catch (error) {
        console.error('Failed fetching events', error);

        if (!cancelled) {
          setError(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    updateEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    events,
    preferredEvent,
    updatePreferredEvent,
    loading,
    error,
  };
}
