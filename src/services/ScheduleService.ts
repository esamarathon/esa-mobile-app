interface IScheduleEvent {
  name: string;
  slug: string;
}

interface IScheduleMeta {
  name: string;
  slug: string;
  timezone: string;
  start: string;
  website: string;
  twitter: string;
  twitch: string;
  description: string;
  setup: string;
  updated: string;
  url: string;
  event: IScheduleEvent;
  exported: string;
}

interface IRunsResponse {
  meta: IScheduleMeta;
  data: IRun[];
}

export interface IRun {
  length: number;
  scheduled: string;
  game: string | null;
  players: string[];
  platform: string | null;
  category: string | null;
  note: string | null;
  layout: string | null;
  info: string | null;
}

const baseUrl = 'https://app.esamarathon.dev/horaro-proxy';

export async function LoadHoraro(key: string, horaroEndpoint: string): Promise<IRunsResponse> {
  const response = await fetch(
    `${baseUrl}/v1/esa/upcoming/${encodeURIComponent(horaroEndpoint)}?amount=5`,
  );
  return response.json();
}

export async function LoadSchedule(key: string, horaroEndpoint: string): Promise<any> {
  const response = await fetch(`${baseUrl}/v1/esa/schedule/${encodeURIComponent(horaroEndpoint)}`);

  const {data} = await response.json();

  const fixObject = Object.entries(data).map(([key, value]) => {
    return Object.assign({
      title: key,
      runs: value,
    });
  });

  return {
    days: [...Object.keys(data)],
    data: fixObject,
  };
}
