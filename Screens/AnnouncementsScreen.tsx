import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class AnnouncementsScreen extends Component {
    static navigationOptions = {
        title: 'Contacts',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Announcements view</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
