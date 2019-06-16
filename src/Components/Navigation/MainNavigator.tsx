import React from 'react';
import {createStackNavigator, createBottomTabNavigator, BottomTabBarProps} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../Screens/HomeScreen';
import SettingsScreen from '../../Screens/SettingsScreen';
import ScheduleScreen from '../../Screens/ScheduleScreen';
import EventDetails from '../../Screens/EventDetails';
import {ThemedBottomTabBar} from './ThemedTabBar';
import {EventContext} from '../../App';
import {HomeIcon, ScheduleIcon, SettingsIcon} from './Icons';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: EventDetails,
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

const SettingsStack = createStackNavigator(
    {
        Schedule: SettingsScreen,
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
        Home: HomeStack,
        Schedule: ScheduleStack,
        Settings: SettingsStack,
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
                    case 'Schedule':
                        return <ScheduleIcon color={color} />;
                    case 'Settings':
                        return <SettingsIcon color={color} />;
                    default:
                        return <Icon name="ellipsis-h" size={22} color={color} />;
                }
            },
        }),
        tabBarOptions: {
            labelStyle: {
                marginTop: 5,
                marginBottom: 5,
            },
        },
    },
);
