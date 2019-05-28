import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {EventContext} from '../App';

export default class EventDetails extends Component {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        const {navigation} = this.props;
        const event = navigation.getParam('event');

        return (
            <EventContext.Consumer>
                {({event}) => (
                    <View style={styles.container}>
                        <Text>{event.name}</Text>
                    </View>
                )}
            </EventContext.Consumer>
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
