type EventTheme = 'default' | 'summer' | 'winter';

interface IEventMeta {
  theme: EventTheme;
  horaro: string;
  twitchChannel: string;
  cause: IEventCause;
  venue: IEventVenue;
}

interface IEventVenue {
  address: string;
  city: string;
  country: string;
  name: string;
}

interface IEventCause {
  name: string;
  link: string;
  logo: string;
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

export async function LoadEvents(): Promise<IEvent[]> {
  const response = await fetch('https://api.submissions.esamarathon.com/events');

  return response.json();
}
