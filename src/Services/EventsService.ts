export type IEventTheme = 'default' | 'summer' | 'winter';

export interface IEventMeta {
    theme: IEventTheme;
    horaro: string;
    twitchChannel: string;
    cause: IEventCause;
}

export interface IEventCause {
    name: string;
    link: string;
    logo: string;
}

export interface IEvent {
    _id?: string;
    name?: string;
    status?: string;
    volunteersNeeded?: string[];
    alwaysEditable?: string[];
    startDate?: string;
    endDate?: string;
    submissionsStart?: string;
    submissionsEnd?: string;
    applicationsStart?: string;
    applicationsEnd?: string;
    meta?: IEventMeta;
    createdAt?: string;
    updatedAt?: string;
}

export async function LoadEvents(): Promise<IEvent[]> {
    const response = await fetch('https://api.submissions.esamarathon.com/events');

    return await response.json();
}
