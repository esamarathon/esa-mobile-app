export interface IEvents {
    events: IEvent;
}

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
    const response = await fetch(
        'https://gist.githubusercontent.com/Stenkilde/da40216f35e9028f019279efca9cfee2/raw/4df36a9a056e53592c30c535b1d49df60eb59127/testme.json',
    );

    // EventContext

    return await response.json();
}
