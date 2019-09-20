import {EventTheme} from './Services/EventsService';

export interface ITheme {
    backgroundColor: string;
    activeTint: string;
    textColor: string;
}

export const Theme: {[key in EventTheme]: ITheme} = {
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
