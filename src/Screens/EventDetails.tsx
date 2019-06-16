import React, {Component} from 'react';
import {StyleSheet, Linking, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import SvgUri from 'react-native-svg-uri';
import dayjs from 'dayjs';
import {IEvent} from '../Services/EventsService';

const twitchPrefix = 'https://twitch.tv/';

const links = {
    attendee: 'https://esamarathon.com/news/5ec16dac-492c-4fa3-9ac4-1bcf896aadbb',
    code: 'https://esamarathon.com/rules',
    master: 'https://esamarathon.com/news/6af741f3-e59c-4e92-967b-0164ea818b19',
};

export default class EventDetails extends Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Details',
    };

    handleClick = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            console.error("Don't know how to open URI: " + url);
        }
    };

    render() {
        const {navigation} = this.props;
        const event: IEvent = navigation.getParam('event');

        return (
            <ScrollView style={styles.fill}>
                <View style={styles.cardContainer}>
                    <View style={styles.header}>
                        <SvgUri
                            width={55}
                            height={55}
                            source={{
                                uri: 'https://esamarathon.com/static/img/logos/logo-borderless.svg',
                            }}
                        />
                        <Text style={[styles.text, styles.headerTitle]}>{event.name}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Date</Text>
                        <Text style={styles.text}>
                            {dayjs(event.startDate).format('dddd, DD MMMM YYYY')} -{' '}
                            {dayjs(event.endDate).format('dddd, DD MMMM YYYY')}
                        </Text>
                    </View>

                    {event.meta.cause.name ? (
                        <View style={styles.card}>
                            <Text style={styles.cardHeader}>Cause</Text>
                            <Text style={styles.text}>{event.meta.cause.name}</Text>
                            <Text style={styles.text}>{event.meta.cause.link}</Text>
                        </View>
                    ) : null}

                    {event.meta.venue.country ? (
                        <View style={styles.card}>
                            <Text style={styles.cardHeader}>Location</Text>
                            <View style={styles.textGroup}>
                                <Text style={styles.text}>{event.meta.venue.name}</Text>
                                <Text style={styles.text}> in </Text>
                                <Text style={styles.text}>
                                    {event.meta.venue.city}, {event.meta.venue.country}
                                </Text>
                            </View>
                        </View>
                    ) : null}

                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Stream</Text>
                        <TouchableOpacity
                            onPress={() =>
                                this.handleClick(`${twitchPrefix}${event.meta.twitchChannel}`)
                            }
                        >
                            <Text style={styles.link}>twitch.tv/{event.meta.twitchChannel}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Info</Text>
                        <TouchableOpacity onPress={() => this.handleClick(links.master)}>
                            <Text style={styles.link}>Master Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleClick(links.code)}>
                            <Text style={styles.link}>Code of Conduct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleClick(links.attendee)}>
                            <Text style={styles.link}>Attendee guide</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Applications</Text>
                        <Text style={styles.text}>
                            {(() => {
                                const applicationHasStarted = dayjs().isAfter(
                                    event.applicationsStart,
                                );
                                const applicationHasNotEnded = dayjs().isBefore(
                                    event.applicationsEnd,
                                );

                                if (applicationHasStarted && applicationHasNotEnded) {
                                    return 'Applications are now open.';
                                }

                                if (!applicationHasStarted && applicationHasNotEnded) {
                                    return 'Applications are yet to open.';
                                }

                                return 'Applications are no longer open.';
                            })()}
                        </Text>
                        <Text style={styles.text}>
                            {dayjs(event.applicationsStart).format('dddd, DD MMMM YYYY')} -{' '}
                            {dayjs(event.applicationsEnd).format('dddd, DD MMMM YYYY')}
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Submissions</Text>
                        <Text style={styles.text}>
                            {(() => {
                                const submissionHasStarted = dayjs().isAfter(
                                    event.submissionsStart,
                                );
                                const submissionHasNotEnded = dayjs().isBefore(
                                    event.submissionsEnd,
                                );

                                if (submissionHasStarted && submissionHasNotEnded) {
                                    return 'Submissions are now open.';
                                }

                                if (!submissionHasStarted && submissionHasNotEnded) {
                                    return 'Submissions are yet to open.';
                                }

                                return 'Submissions are no longer open.';
                            })()}
                        </Text>
                        <Text style={styles.text}>
                            {dayjs(event.submissionsStart).format('dddd, DD MMMM YYYY')} -{' '}
                            {dayjs(event.submissionsEnd).format('dddd, DD MMMM YYYY')}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: '#EAEEF1',
    },
    cardContainer: {
        flex: 1,
        marginTop: 24,
        paddingHorizontal: 24,
    },
    card: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,

        fontSize: 16,

        backgroundColor: '#fff',
        borderRadius: 10,
        minHeight: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 1,
    },
    cardHeader: {
        fontSize: 13,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
    text: {
        color: '#000',
    },
    textGroup: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    link: {
        color: 'blue',
    },
    header: {
        height: 55,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        marginLeft: 20,
    },
});
