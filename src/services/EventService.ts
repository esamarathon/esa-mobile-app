export type EventTheme = 'default' | 'summer' | 'winter';

interface IEventCause {
  name: string;
  link: string;
  logo: string;
}

interface IEventVenue {
  address: string;
  city: string;
  country: string;
  name: string;
}

interface IEventMeta {
  theme: EventTheme;
  horaro: string;
  twitchChannel: string;
  cause: IEventCause;
  venue: IEventVenue;
}

export interface IEvent {
  _id: string;
  name: string;
  status: string;
  volunteersNeeded: string[];
  alwaysEditable: string[];
  startDate: string;
  endDate: string;
  submissionsStart: string;
  submissionsEnd: string;
  applicationsStart: string;
  applicationsEnd: string;
  meta: IEventMeta;
  createdAt: string;
  updatedAt: string;
}

const baseURL = 'https://api.submissions.esamarathon.com';
export async function loadFromESASubmissions<T extends IEvent[]>(): Promise<T> {
  const response = await fetch(`${baseURL}/events`);
  return response.json();
}
