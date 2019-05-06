import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screens/HomeScreen';
import ContactScreen from './Screens/ContactScreen';
import AnnouncementsScreen from './Screens/AnnouncementsScreen';
import ScheduleScreen from './Screens/ScheduleScreen';
import NotificationScreen from './Screens/NotificationScreen';

Icon.loadFont();

const HomeStack = createStackNavigator({
    Home: HomeScreen
    // Details: DetailsScreen,
});

const ScheduleStack = createStackNavigator({
    Schedule: ScheduleScreen
});

const NotificationStack = createStackNavigator({
    Notification: NotificationScreen
});

const AnnouncementsStack = createStackNavigator({
    Announcements: AnnouncementsScreen
});

const MoreStack = createStackNavigator({
    Contact: ContactScreen
    // Details: DetailsScreen,
});

const TabNavigator = createBottomTabNavigator(
    {
        Notification: NotificationStack,
        Schedule: ScheduleStack,
        Home: HomeStack,
        Announcements: AnnouncementsStack,
        More: MoreStack
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                } else {
                    iconName = `ellipsis-h`;
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={30} color="#881AE8" />;
            }
        }),
        tabBarOptions: {
            activeTintColor: '#881AE8',
            inactiveTintColor: 'gray'
        }
    }
);

export default createAppContainer(TabNavigator);
