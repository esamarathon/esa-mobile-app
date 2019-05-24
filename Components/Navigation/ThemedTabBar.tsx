import React from 'react';
import {BottomTabBar} from 'react-navigation';

const ThemeConstants = {
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

export class ThemedBottomTabBar extends React.Component {
    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={ThemeConstants[this.props.theme].activeTintColor}
                inactiveTintColor={ThemeConstants[this.props.theme].inactiveTintColor}
                style={{
                    backgroundColor: ThemeConstants[this.props.theme].backgroundColor,
                    borderTopColor: ThemeConstants[this.props.theme].borderColor,
                }}
            />
        );
    }
}
