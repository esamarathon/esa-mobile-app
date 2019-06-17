import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import {EventContext} from '../App';
import dayjs from 'dayjs';
import AnnouncementList from '../Components/Announcement/AnnouncementList';
import {IEvent} from '../Services/EventsService';
import {GetActiveTintForEvent, GetBackgroundColorForEvent} from '../Themes';

export default class HomeScreen extends Component<NavigationInjectedProps> {
    handleEventClick = (item: IEvent) => {
        this.props.navigation.navigate('Details', {
            event: item,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <EventContext.Consumer>
                    {({event}) => (
                        <TouchableOpacity
                            style={styles.eventContainer}
                            activeOpacity={0.8}
                            onPress={() => this.handleEventClick(event)}
                        >
                            <View
                                style={[
                                    styles.containerHeader,
                                    {backgroundColor: GetBackgroundColorForEvent(event)},
                                ]}
                            >
                                <View
                                    style={[
                                        styles.headerSpecial,
                                        {backgroundColor: GetActiveTintForEvent(event)},
                                    ]}
                                />
                            </View>
                            <View style={styles.innerContainer}>
                                <Text style={[styles.title, styles.alignTextRight]}>
                                    {event.name}
                                </Text>
                                <Text style={[styles.date, styles.alignTextRight]}>
                                    {dayjs(event.startDate).format('D')} -
                                    {dayjs(event.endDate).format('D MMMM')}
                                </Text>
                                {event.meta && (
                                    <>
                                        {event.meta.venue.city ? (
                                            <Text style={[styles.text, styles.alignTextRight]}>
                                                in{' '}
                                                <Text style={styles.bold}>
                                                    {`${event.meta.venue.city}, ${event.meta.venue.country}`}
                                                </Text>
                                            </Text>
                                        ) : null}
                                        {event.meta.cause.name ? (
                                            <Text style={[styles.text, styles.alignTextRight]}>
                                                for{' '}
                                                <Text style={styles.bold}>
                                                    {event.meta.cause.name}
                                                </Text>
                                            </Text>
                                        ) : null}
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
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
        marginTop: '40%',
        backgroundColor: '#FFFFFF',
        width: '75%',
        paddingTop: 26,
        paddingBottom: 20,
        alignSelf: 'flex-end',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 4,
        borderTopLeftRadius: 5,
        overflow: 'hidden',
        borderBottomLeftRadius: 5,
        elevation: 1,
    },
    containerHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
    },
    headerSpecial: {
        alignSelf: 'flex-end',
        height: '100%',
        width: '20%',
    },
    alignTextRight: {
        textAlign: 'right',
    },
    innerContainer: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 26,
        margin: 0,
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
