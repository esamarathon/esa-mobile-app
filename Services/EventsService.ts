export interface IEvents {
    events: IEvent;
}

export interface IEventMeta {
    theme: string;
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
    const response = await fetch(
        'https://gist.githubusercontent.com/Stenkilde/da40216f35e9028f019279efca9cfee2/raw/d00b881e20f1531a701468020e86f4dbf9de9a47/testme.json',
    );
    return await response.json();
}
