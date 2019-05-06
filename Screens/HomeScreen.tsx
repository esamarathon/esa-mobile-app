import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    authenticate = () => {
        console.log('Auth all you want you');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text>Welcome to ESA Summer 2019</Text>
                </View>
                <View>
                    <Text>Some features are locked behind authentication</Text>
                    <Button title="Auth with Twitch" onPress={this.authenticate} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    topContainer: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
