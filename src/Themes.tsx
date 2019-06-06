import {IEvent} from './Services/EventsService';

export const Theme = {
    default: {
        backgroundColor: '#7D2DDF',
        activeTint: '#FFBD17',
        textColor: '#ffffff',
    },
    summer: {
        backgroundColor: '#BA76CB',
        activeTint: '#FFBD17',
        textColor: '#ffffff',
    },
    winter: {
        backgroundColor: '#99E1F7',
        activeTint: '#1C2175',
        textColor: '#ffffff',
    },
};

export const GetThemeForEvent = (event: IEvent) => {
    return event.meta ? event.meta.theme : 'default';
};

export const GetBackgroundColorForEvent = (event: IEvent) => {
    return event.meta ? Theme[event.meta.theme].backgroundColor : Theme.default.backgroundColor;
};

export const GetActiveTintForEvent = (event: IEvent) => {
    return event.meta ? Theme[event.meta.theme].activeTint : Theme.default.activeTint;
};

export const GetTextColorForEvent = (event: IEvent) => {
    return event.meta ? Theme[event.meta.theme].textColor : Theme.default.textColor;
};
