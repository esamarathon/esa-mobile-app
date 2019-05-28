import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import {IEvent} from '../Services/EventsService';

interface IProps {}

interface IState {
    events: IEvent[];
}

export default class HomeScreen extends Component<IProps, IState> {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props: any) {
        super(props);

        this.state = {
            events: [],
        };
    }

    authenticate = () => {
        console.log('Auth all you want you');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.welcome}>Welcome to ESA Summer 2019</Text>
                </View>
                <View>
                    <Text style={styles.instructions}>
                        Some features are locked behind authentication
                    </Text>
                    <View style={styles.button}>
                        <Button title="Auth with Twitch" onPress={this.authenticate} />
                    </View>
                </View>
                {this.state.events.map((event) => {
                    return <Text key={event.name}>{event.name}</Text>;
                })}
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
    topContainer: {
        paddingVertical: 10,
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 20,
    },
    button: {
        marginTop: 5,
    },
});
