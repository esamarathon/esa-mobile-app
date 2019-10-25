interface IScheduleEvent {
  name: string;
  slug: string;
}

interface IScheduleItem {
  length: string;
  length_t: number;
  scheduled: string;
  scheduled_t: number;
  data: string[];
}

interface ISchedule {
  name: string;
  slug: string;
  timezone: string;
  start: string;
  start_t: number;
  website: string;
  twitter: string;
  twitch: string;
  description: string;
  setup: string;
  setup_t: number;
  updated: string;
  url: string;
  event: IScheduleEvent;
  hidden_columns: string[];
  columns: string[];
  items: IScheduleItem[];
}

interface IScheduleMeta {
  exported: string;
  hint: string;
  api: string;
  'api-link': string;
}

interface IRunsResponse {
  meta: IScheduleMeta;
  schedule: ISchedule;
}

export interface IRun {
  length: string;
  length_t: number;
  scheduled: string;
  scheduled_t: number;
  Game?: string;
  'Player(s)'?: string;
  Platform?: string;
  Category?: string;
  Note?: string | null;
  Layout?: string;
  Info?: string | null;
}

export async function LoadHoraro(horaroEndpoint: string) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${horaroEndpoint}.json`);
  const {schedule}: IRunsResponse = await response.json();

  return schedule.items.map(({data, ...rest}) =>
    data.reduce<IRun>(
      (total, next, index) =>
        Object.assign(total, {
          [schedule.columns[index]]: next,
        }),
      {...rest},
    ),
  );
}
