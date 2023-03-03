interface IEventMeta {
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
  event: {
    name: string;
    slug: string;
  };
  exported: string;
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
  id: string;
  parsedGame?: IParsedGame | string;
}

export interface IParsedGame {
  name: string;
  highlightUrl: string;
}

export interface IUpcomingResponse {
  meta: IEventMeta;
  data: IRun[];
}

export interface IScheduleResponse {
  meta: IEventMeta;
  data: {
    [key: string]: IRun[];
  };
}

const baseUrl = 'https://app.esamarathon.dev/horaro-proxy/v1/esa';

export async function loadFromHoraro<T extends IScheduleResponse | IUpcomingResponse>(
  horaroEvent: string,
): Promise<T> {
  const response = await fetch(`${baseUrl}/${horaroEvent}1`);
  return response.json();
}
