import React from 'react';
import {createStackNavigator, createBottomTabNavigator, BottomTabBarProps} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../Screens/HomeScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import AnnouncementsScreen from '../../Screens/AnnouncementsScreen';
import EventsScreen from '../../Screens/EventsScreen';
import ScheduleScreen from '../../Screens/ScheduleScreen';
import EventDetails from '../../Screens/EventDetails';
import {ThemedBottomTabBar} from './ThemedTabBar';
import {EventContext} from '../../App';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        // Details: DetailsScreen,
    },
    {
        headerMode: 'none',
    },
);

const ScheduleStack = createStackNavigator(
    {
        Schedule: ScheduleScreen,
    },
    {
        headerMode: 'none',
    },
);

const NotificationStack = createStackNavigator(
    {
        Notification: NotificationScreen,
    },
    {
        headerMode: 'none',
    },
);

const AnnouncementsStack = createStackNavigator(
    {
        Announcements: AnnouncementsScreen,
    },
    {
        headerMode: 'none',
    },
);

const MoreStack = createStackNavigator(
    {
        Contact: EventsScreen,
        Details: EventDetails,
    },
    {
        headerMode: 'none',
    },
);

const WrappedTabBar = (navigation: BottomTabBarProps) => {
    return (
        <EventContext.Consumer>
            {({event}) => <ThemedBottomTabBar navigation={navigation} event={event} />}
        </EventContext.Consumer>
    );
};

export const TabNavigator = createBottomTabNavigator(
    {
        Schedule: ScheduleStack,
        Home: HomeStack,
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
