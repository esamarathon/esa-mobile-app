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

const baseUrl = 'http://localhost:8080';

export async function LoadHoraro(horaroEndpoint: string): Promise<IRunsResponse> {
  const response = await fetch(`${baseUrl}/v1/esa/${encodeURIComponent(horaroEndpoint)}`);
  return response.json();
}
