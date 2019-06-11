import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomTabBar, BottomTabBarProps} from 'react-navigation';
import {IEvent} from '../../Services/EventsService';
import {GetActiveTintForEvent} from '../../Themes';

interface IProps {
    event: IEvent;
    navigation: BottomTabBarProps;
}

export class ThemedBottomTabBar extends React.Component<IProps> {
    render() {
        const {event, navigation} = this.props;

        return (
            <BottomTabBar
                {...navigation}
                activeTintColor={GetActiveTintForEvent(event)}
                inactiveTintColor={'#B0B0B0'}
                style={styles.tabBar}
            />
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        borderTopColor: '#fff',
        paddingTop: 10,
        backgroundColor: '#fff',
    },
});
