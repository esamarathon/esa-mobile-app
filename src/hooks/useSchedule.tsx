import {LoadHoraro, IRun} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';
import {useState, useEffect} from 'react';

export function useSchedule(event?: IEvent) {
  const [runs, setRuns] = useState<IRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    let cancelled = false;

    async function loadEvents(event?: IEvent) {
      setError(undefined);

      if (!event || !false) {
        setRuns([]);
        return;
      }

      try {
        setLoading(true);
        const runs = await LoadHoraro(event.meta.horaro);
        if (!cancelled) {
          setRuns(runs);
        }
      } catch (error) {
        console.error('Failed fetching schedule', error);

        if (!cancelled) {
          setError(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents(event);

    return () => {
      cancelled = true;
    };
  }, [event]);

  return {runs, error, loading};
}
