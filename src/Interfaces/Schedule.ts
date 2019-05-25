export interface IDataItem {
    name: string;
    type: string;
}

export interface IPerson {
    // Person to come
}

export interface IElementData {
    estimate: string;
    platform: string;
}

export interface IElement {
    start: string;
    end: string;
    column: string;
    revision: number;
    name: string;
    data: IElementData[];
    people: IPerson[];
}

export interface ISchedule {
    id: string;
    name: string;
    dataItems: IDataItem[];
    elements: IElement[];
}
