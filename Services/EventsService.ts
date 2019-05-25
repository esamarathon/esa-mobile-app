interface IEvents {
    events: IEvent;
}

interface IEventMeta {
    theme: string;
    horaro: string;
    twitchChannel: string;
    cause: IEventCause;
}

interface IEventCause {
    name: string;
    link: string;
    logo: string;
}

interface IEvent {
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

export async function LoadEvents(): Promise<IEvents> {
    const response = await fetch(
        'https://gist.githubusercontent.com/Stenkilde/da40216f35e9028f019279efca9cfee2/raw/6542cd832726ce49a8106b6899b4bf3cefba1436/testme.json',
    );
    return await response.json();
}
