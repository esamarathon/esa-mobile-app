import React from 'react';
import {createStackNavigator, createBottomTabNavigator, BottomTabBarProps} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../Screens/HomeScreen';
import EventsScreen from '../../Screens/EventsScreen';
import AnnouncementsScreen from '../../Screens/AnnouncementsScreen';
import ScheduleScreen from '../../Screens/ScheduleScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import EventDetails from '../../Screens/EventDetails';
import {ThemedBottomTabBar} from './ThemedTabBar';

import {EventContext} from '../../App';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    // Details: DetailsScreen,
});

const ScheduleStack = createStackNavigator({
    Schedule: ScheduleScreen,
});

const NotificationStack = createStackNavigator({
    Notification: NotificationScreen,
});

const AnnouncementsStack = createStackNavigator({
    Announcements: AnnouncementsScreen,
});

const MoreStack = createStackNavigator({
    Contact: EventsScreen,
    Details: EventDetails,
});

const WrappedTabBar = (navigation: BottomTabBarProps) => {
    return (
        <EventContext.Consumer>
            {({event}) => <ThemedBottomTabBar navigation={navigation} event={event} />}
        </EventContext.Consumer>
    );
};

export const TabNavigator = createBottomTabNavigator(
    {
        // Notification: NotificationStack,
        Schedule: ScheduleStack,
        Home: HomeStack,
        // Announcements: AnnouncementsStack,
        Events: MoreStack,
    },
    {
        initialRouteName: 'Home',
        tabBarComponent: WrappedTabBar,
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({tintColor}) => {
                const {routeName} = navigation.state;

                const icons: {[x: string]: string} = {
                    Home: 'home',
                    Notification: 'bell',
                    Schedule: 'calendar',
                    Announcements: 'comments',
                };

                const iconName = icons[routeName] || 'ellipsis-h';

                return <Icon name={iconName} size={24} color={tintColor || undefined} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#881AE8',
            inactiveTintColor: 'gray',
            labelStyle: {
                marginTop: 0,
                marginBottom: 5,
            },
        },
    },
);
