import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import {SidebarItem} from '../Components/Sidebar/SidebarItem';

export default class ScheduleScreen extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        drawerLabel: () => <SidebarItem name="Schedule" />,
    };

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.props.navigation.goBack()} title="Go back home" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
});
