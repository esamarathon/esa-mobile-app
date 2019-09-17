import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from "react-navigation-drawer";
import ScheduleScreen from "./Screens/Schedule";
import HomeScreen from "./Screens/Home";

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    Schedule: {
        screen: ScheduleScreen,
    },
});

export const App = createAppContainer(MyDrawerNavigator);
