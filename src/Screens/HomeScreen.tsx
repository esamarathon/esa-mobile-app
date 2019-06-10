import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EventContext} from '../App';
import dayjs from 'dayjs';

interface IProps {}

interface IState {}

export default class HomeScreen extends Component<IProps, IState> {
    authenticate = () => {
        console.log('Auth all you want you');
    };

    render() {
        return (
            <View style={styles.container}>
                <EventContext.Consumer>
                    {({event}) => (
                        <View style={styles.eventContainer}>
                            <Text>{event.name}</Text>
                            <Text>
                                {dayjs(event.startDate).format('D')} -
                                {dayjs(event.endDate).format('D MMMM')}
                            </Text>
                            <Text style={styles.metaText}>In Malmö, Sweden</Text>
                            <Text>For {event.meta ? event.meta.cause.name : 'Missing Cause'}</Text>
                        </View>
                    )}
                </EventContext.Consumer>
                <View style={styles.announcement}>
                    <Text>Announcements</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEEF1',
    },
    eventContainer: {
        marginTop: 200,
        textAlign: 'right',
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        width: 310,
        height: 165,
    },
    announcement: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-end',
    },
});
