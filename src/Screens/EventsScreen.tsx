import React from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IEvent} from '../Services/EventsService';
import EventCard from '../Components/Event/EventCard';
import LogoBorderless from '../Assets/logo/logo-borderless.svg';

interface IProps {
    events: IEvent[];
    onPickEvent: (event: IEvent) => void;
}

export default function EventsScreen({events, onPickEvent}: IProps) {
    const noEvents = events.length === 0;

    return (
        <LinearGradient
            colors={['#133895', '#161E32']}
            useAngle={true}
            angle={315}
            angleCenter={{x: 0.5, y: 0.5}}
            style={styles.linearGradient}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <LogoBorderless width={60} height={60} />
                </View>

                <View style={styles.infoText}>
                    <Text style={styles.eventTitle}>
                        {noEvents ? 'No events coming up...' : 'Pick your event'}
                    </Text>
                    <Text style={styles.eventDescription}>
                        {noEvents
                            ? 'Please check back later.'
                            : "Don't worry, you can always switch between events later"}
                    </Text>
                </View>

                <FlatList
                    data={events}
                    horizontal={true}
                    renderItem={({item}) => <EventCard event={item} handleClick={onPickEvent} />}
                    keyExtractor={(item: IEvent) => item._id.substring(0, 1)}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    logoContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginLeft: 15,
    },
    eventTitle: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    eventDescription: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 2,
    },
    infoText: {
        paddingLeft: 40,
        paddingRight: 130,
        marginBottom: 50,
        color: '#ffffff',
    },
    noEventsText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 20,
        marginLeft: 50,
    },
});
