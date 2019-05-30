import React, {Component} from 'react';
import {Text, Button, StyleSheet, View} from 'react-native';
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
                {({updateEvent}) => (
                    <View style={styles.container}>
                        <Text>{event.name}</Text>
                        <Button title={'Select Event'} onPress={() => updateEvent(event)} />
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
});
