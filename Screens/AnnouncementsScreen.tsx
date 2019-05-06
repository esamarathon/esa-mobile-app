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
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
});
