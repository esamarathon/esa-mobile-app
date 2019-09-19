import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';

export class ScheduleScreen extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        drawerLabel: 'Schedule',
        drawerIcon: () => (
            <Image
                source={{
                    uri: 'https://cdn3.iconfinder.com/data/icons/menu-icons-1/100/menu-512.png',
                }}
                style={[styles.icon]}
            />
        ),
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
