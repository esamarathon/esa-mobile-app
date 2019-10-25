import {useState, useEffect} from 'react';
import {LoadHoraro, IRun} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';

export function useSchedule(event?: IEvent) {
  const [runs, setRuns] = useState<IRun[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents(event?: IEvent) {
      if (!event || !event.meta.horaro) {
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
        console.error('Failed fetching schedule. Setting to empty array as fallback', error);
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

  return {runs, loading};
}
