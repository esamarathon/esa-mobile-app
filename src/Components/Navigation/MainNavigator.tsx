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
import {HomeIcon, EventsIcon, ScheduleIcon} from './Icons';

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

                const color = tintColor || '#B8B8B8';

                switch (routeName) {
                    case 'Home':
                        return <HomeIcon color={color} />;
                    case 'Events':
                        return <EventsIcon color={color} />;
                    case 'Schedule':
                        return <ScheduleIcon color={color} />;
                    default:
                        return <Icon name="ellipsis-h" size={22} color={color} />;
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: '#881AE8',
            inactiveTintColor: '#B8B8B8',
            labelStyle: {
                marginTop: 5,
                marginBottom: 5,
            },
        },
    },
);
