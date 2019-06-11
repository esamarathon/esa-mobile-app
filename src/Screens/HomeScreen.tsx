import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EventContext} from '../App';
import dayjs from 'dayjs';
import AnnouncementList from '../Components/Announcement/AnnouncementList';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <EventContext.Consumer>
                    {({event}) => (
                        <View style={styles.eventContainer}>
                            <View style={styles.containerHeader}>
                                <View style={styles.headerSpecial} />
                            </View>
                            <View style={[styles.innerContainer, styles.innerEventContainer]}>
                                <Text style={[styles.title, styles.alignTextRight]}>
                                    {event.name}
                                </Text>
                                <Text style={[styles.date, styles.alignTextRight]}>
                                    {dayjs(event.startDate).format('D')} -
                                    {dayjs(event.endDate).format('D MMMM')}
                                </Text>
                                <Text style={[styles.text, styles.alignTextRight]}>
                                    in{' '}
                                    <Text style={styles.bold}>
                                        {event.meta
                                            ? `${event.meta.venue.city}, ${event.meta.venue.country}`
                                            : 'Missing city'}
                                    </Text>
                                </Text>
                                {event.meta && event.meta.cause.name ? (
                                    <Text style={[styles.text, styles.alignTextRight]}>
                                        for <Text style={styles.bold}>{event.meta.cause.name}</Text>
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                    )}
                </EventContext.Consumer>
                <View style={styles.innerContainer}>
                    <AnnouncementList />
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
    bold: {
        fontWeight: 'bold',
        color: '#444',
    },
    eventContainer: {
        marginTop: 150,
        textAlign: 'right',
        backgroundColor: '#FFFFFF',
        width: 310,
        alignSelf: 'flex-end',
        height: 165,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerHeader: {
        position: 'relative',
        height: 6,
        backgroundColor: '#881AE8',
    },
    headerSpecial: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 6,
        width: 50,
        backgroundColor: '#FFBD17',
    },
    innerEventContainer: {
        paddingTop: 20,
    },
    alignTextRight: {
        textAlign: 'right',
    },
    innerContainer: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 26,
        color: '#000',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
    text: {
        fontSize: 18,
    },
});
