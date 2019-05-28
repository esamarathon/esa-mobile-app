import React from 'react';
import {createStackNavigator, createBottomTabNavigator, BottomTabBarProps} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../Screens/HomeScreen';
import ContactScreen from '../../Screens/ContactScreen';
import AnnouncementsScreen from '../../Screens/AnnouncementsScreen';
import ScheduleScreen from '../../Screens/ScheduleScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import {ThemedBottomTabBar} from './ThemedTabBar';

import {ThemeContext} from '../../App';

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
    Contact: ContactScreen,
    // Details: DetailsScreen,
});

const WrappedTabBar = (navigation: BottomTabBarProps) => {
    return (
        <ThemeContext.Consumer>
            {({theme}) => <ThemedBottomTabBar navigation={navigation} theme={theme} />}
        </ThemeContext.Consumer>
    );
};

export const TabNavigator = createBottomTabNavigator(
    {
        Notification: NotificationStack,
        Schedule: ScheduleStack,
        Home: HomeStack,
        Announcements: AnnouncementsStack,
        More: MoreStack,
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

                return <Icon name={iconName} size={20} color={tintColor || undefined} />;
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
