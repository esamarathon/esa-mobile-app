import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomTabBar, BottomTabBarProps} from 'react-navigation';
import {IEvent} from '../../Services/EventsService';
import {GetBackgroundColorForEvent} from '../../Themes';

interface IProps {
    event: IEvent;
    navigation: BottomTabBarProps;
}

export default function ThemedBottomTabBar({event, navigation}: IProps) {
    return (
        <BottomTabBar
            {...navigation}
            activeTintColor={GetBackgroundColorForEvent(event)}
            inactiveTintColor={'#A8A8A8'}
            style={styles.tabBar}
        />
    );
}

const styles = StyleSheet.create({
    tabBar: {
        borderTopColor: '#fff',
        paddingTop: 10,
        backgroundColor: '#fff',
    },
});
