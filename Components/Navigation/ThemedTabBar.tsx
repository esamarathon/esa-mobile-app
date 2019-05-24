import React from 'react';
import {BottomTabBar, BottomTabBarProps} from 'react-navigation';

export const ThemeConstants = {
    light: {
        backgroundColor: '#fff',
        fontColor: '#000',
        activeTintColor: 'blue',
        inactiveTintColor: '#ccc',
        borderColor: 'rgba(0,0,0,0.2)',
    },
    dark: {
        backgroundColor: '#000',
        fontColor: '#fff',
        activeTintColor: '#fff',
        inactiveTintColor: '#888',
        borderColor: 'rgba(255,255,255,0.2)',
    },
};

interface IProps {
    theme: 'light' | 'dark';
    navigation: BottomTabBarProps;
}

export class ThemedBottomTabBar extends React.Component<IProps> {
    render() {
        const {theme, navigation} = this.props;

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
