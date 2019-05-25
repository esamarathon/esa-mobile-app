interface IEvent {
    name: string;
    slug: string;
}
interface IItem {
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
    event: IEvent;
    hidden_columns: string[];
    columns: string[];
    items: IItem[];
}

interface IMeta {
    exported: string;
    hint: string;
    api: string;
    'api-link': string;
}

interface IRunsResponse {
    meta: IMeta;
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

export function extractLinks(markdown?: string) {
    if (!markdown) {
        return [];
    }

    const pattern = /\[([^\]]+)?\]\(([^\)]+)?\)/g; // match [name](link) in a string anywhere
    const matches = [];

    let match = null;
    while ((match = pattern.exec(markdown))) {
        matches.push({
            name: match[1],
            link: match[2],
        });
    }

    return matches;
}

export async function LoadHoraro() {
    const response = await fetch('https://horaro.org/esa/2018-one.json?named=true');
    const {schedule}: IRunsResponse = await response.json();

    const columns = Object.values(schedule.columns);

    return schedule.items.map(({data, ...rest}) => {
        return data.reduce<IRun>(
            (total, next, index) => ({
                ...total,
                [columns[index]]: next,
            }),
            {...rest},
        );
    });
}
