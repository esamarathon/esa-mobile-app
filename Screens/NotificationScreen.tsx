import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class NotificationScreen extends Component {
    static navigationOptions = {
        title: 'Notification',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Notification view</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
});
