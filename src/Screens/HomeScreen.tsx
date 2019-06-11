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
                                    In Malmö, Sweden
                                </Text>
                                <Text style={[styles.text, styles.alignTextRight]}>
                                    For {event.meta ? event.meta.cause.name : 'Missing Cause'}
                                </Text>
                            </View>
                        </View>
                    )}
                </EventContext.Consumer>
                <View style={styles.innerContainer}>
                    <View style={styles.announcement}>
                        <Text style={styles.textTitle}>Announcements</Text>
                        <View style={styles.innerContainer}>
                            <View style={styles.item}>
                                <View style={styles.metaText}>
                                    <Text style={styles.metaTitle}>Schedule Release</Text>
                                    <Text style={styles.itemGrow}>3 days ago</Text>
                                </View>
                                <Text>
                                    You can now find the schedules for both streams on our website:
                                    website: https://esamarathon.com/schedule If you wish to
                                    re-watch the live reveal, you’ll be able...
                                </Text>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.metaText}>
                                    <Text style={styles.metaTitle}>Prize submission is live</Text>
                                    <Text style={styles.itemGrow}>2 months ago</Text>
                                </View>
                                <Text>
                                    Hey Girls and Boys, Artists and Crafters, Blacksmiths and
                                    Alchemists, ESA is happy to announce that the Prize Submission
                                    for our Summer Event is open from now on.
                                </Text>
                            </View>
                        </View>
                    </View>
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
        backgroundColor: '#fff',
        width: 310,
        alignSelf: 'flex-end',
        height: 165,
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
    announcement: {
        marginTop: 60,
    },
    innerContainer: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
    text: {
        fontSize: 18,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, .7)',
    },
    item: {
        marginTop: 20,
    },
    metaText: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    metaTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemGrow: {
        flex: 1,
        textAlign: 'right',
        fontSize: 11,
        color: 'rgba(0, 0, 0, .7)',
    },
});
