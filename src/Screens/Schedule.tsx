import React from 'react';
import {Button} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import SidebarItem from '../Components/Sidebar/SidebarItem';

export default function ScheduleScreen({navigation}: NavigationInjectedProps) {
    return <Button onPress={() => navigation.goBack()} title="Go back home" />;
}

ScheduleScreen.navigationOptions = {};
