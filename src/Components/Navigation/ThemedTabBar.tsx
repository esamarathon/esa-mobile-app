import React from 'react';
import {BottomTabBar, BottomTabBarProps} from 'react-navigation';
import {IEvent, IEventTheme} from '../../Services/EventsService';

export const ThemeConstants = {
    default: {
        backgroundColor: '#7D2DDF',
        fontColor: '#fff',
        activeTintColor: '#FFBD17',
        inactiveTintColor: '#fff',
        borderColor: 'rgba(255,255,255,0.2)',
    },
    summer: {
        backgroundColor: '#BA76CB',
        fontColor: '#fff',
        activeTintColor: '#FFBD17',
        inactiveTintColor: '#fff',
        borderColor: 'rgba(255,255,255,0.2)',
    },
    winter: {
        backgroundColor: '#99E1F7',
        fontColor: '#fff',
        activeTintColor: '#1C2175',
        inactiveTintColor: '#fff',
        borderColor: 'rgba(255,255,255,0.2)',
    },
};

interface IProps {
    event: IEvent;
    navigation: BottomTabBarProps;
}

export class ThemedBottomTabBar extends React.Component<IProps> {
    render() {
        const {event, navigation} = this.props;

        const theme: IEventTheme = event.meta ? event.meta.theme : 'default';

        return (
            <BottomTabBar
                {...navigation}
                activeTintColor={ThemeConstants[theme].activeTintColor}
                inactiveTintColor={ThemeConstants[theme].inactiveTintColor}
                style={{
                    backgroundColor: ThemeConstants[theme].backgroundColor,
                    borderTopColor: ThemeConstants[theme].borderColor,
                }}
            />
        );
    }
}
