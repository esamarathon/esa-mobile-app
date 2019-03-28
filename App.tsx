import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

import HomeScreen from './Screens/HomeScreen';
import ContactScreen from './Screens/ContactScreen';

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Contact: ContactScreen
//   },{
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#881AE8',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   },
// );

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  // Details: DetailsScreen,
});

const MoreStack = createStackNavigator({
  Contact: ContactScreen,
  // Details: DetailsScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Stuff: MoreStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
        } else if (routeName === 'Stuff') {
          iconName = `ellipsis-h`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={30} color="#881AE8" />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#881AE8',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);