export interface dataItem {
    name: string;
    type: string;
}

export interface person {
    // Person to come
}

export interface elementData {
    estimate: string;
    platform: string;
}

export interface element {
    start: string;
    end: string;
    column: string;
    revision: number;
    name: string;
    data: elementData[];
    people: person[];
}

export interface schedule {
    id: string;
    name: string;
    dataItems: dataItem[];
    elements: element[];
}
