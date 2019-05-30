import React from 'react';
import {BottomTabBar, BottomTabBarProps} from 'react-navigation';
import {IEvent, IEventTheme} from '../../Services/EventsService';
import {Theme} from '../../Themes';

export const ThemeConstants = {
    default: {
        backgroundColor: Theme.default.backgroundColor,
        fontColor: '#fff',
        activeTintColor: Theme.default.activeTint,
        inactiveTintColor: '#fff',
        borderColor: 'rgba(255,255,255,0.2)',
    },
    summer: {
        backgroundColor: Theme.summer.backgroundColor,
        fontColor: '#fff',
        activeTintColor: Theme.summer.activeTint,
        inactiveTintColor: '#fff',
        borderColor: 'rgba(255,255,255,0.2)',
    },
    winter: {
        backgroundColor: Theme.winter.backgroundColor,
        fontColor: '#fff',
        activeTintColor: Theme.winter.activeTint,
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
