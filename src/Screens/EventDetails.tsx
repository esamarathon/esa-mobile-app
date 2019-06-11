import React, {Component} from 'react';
import {Button, StyleSheet, Linking, Text, View, TouchableOpacity} from 'react-native';
import {EventContext} from '../App';
import ParallaxView from '../Components/Common/ParallaxView';
import {GetBackgroundColorForEvent} from '../Themes';
import {IEvent} from '../Services/EventsService';
import dayjs from 'dayjs';
import SvgUri from 'react-native-svg-uri';
import {NavigationScreenConfigProps} from 'react-navigation';

interface IProps {
    navigation: NavigationScreenConfigProps;
}

export default class EventDetails extends Component<IProps> {
    static navigationOptions = {
        title: 'Details',
    };

    handleClick = (scheme: string) => {
        const url =
            scheme === 'master'
                ? 'https://esamarathon.com/news/6af741f3-e59c-4e92-967b-0164ea818b19'
                : scheme === 'code'
                ? 'https://esamarathon.com/rules'
                : 'https://esamarathon.com/news/5ec16dac-492c-4fa3-9ac4-1bcf896aadbb';

        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    render() {
        const {navigation} = this.props;
        const event: IEvent = navigation.getParam('event');

        return (
            <EventContext.Consumer>
                {({updateEvent}) => (
                    <View style={styles.fill}>
                        <ParallaxView
                            title={event.name}
                            backgroundColor={GetBackgroundColorForEvent(event)}
                            headerAsset={require('../Assets/stock/stock1.jpg')}
                        >
                            <View style={styles.cardContainer}>
                                <View style={styles.card}>
                                    <Text style={styles.cardHeader}>Event</Text>
                                    <Text>{event.name}</Text>
                                    <Text>{dayjs(event.startDate).format('dd, DD MMM, YYYY')}</Text>
                                </View>

                                <View style={styles.card}>
                                    <Text style={styles.cardHeader}>Cause</Text>
                                    <Text>{event.meta.cause.name}</Text>
                                    <Text>{event.meta.cause.link}</Text>
                                    <View style={styles.image}>
                                        <SvgUri
                                            width={75}
                                            height={75}
                                            source={{
                                                uri:
                                                    'https://esamarathon.com/static/img/logos/logo-borderless.svg',
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={styles.card}>
                                    <Text style={styles.cardHeader}>Location</Text>
                                    <Text>Venue: Quality Hotel View</Text>
                                    <Text>City: Malmö</Text>
                                    <Text>Country: Sweden</Text>
                                </View>

                                <View style={styles.card}>
                                    <Text style={styles.cardHeader}>Info</Text>
                                    <TouchableOpacity onPress={() => this.handleClick('master')}>
                                        <Text style={styles.link}>Master Post</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleClick('code')}>
                                        <Text style={styles.link}>Code of Conduct</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleClick('attendee')}>
                                        <Text style={styles.link}>Attendee guide</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ParallaxView>
                        <View>
                            <Button
                                style={styles.button}
                                title={'Set as preferred event'}
                                onPress={() => updateEvent(event)}
                            />
                        </View>
                    </View>
                )}
            </EventContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
        borderRadius: 2,
        minHeight: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 5,
    },
    cardHeader: {
        fontSize: 24,
    },
    link: {
        color: 'blue',
    },
    button: {
        alignSelf: 'flex-end',
    },
    image: {
        width: 75,
        height: 75,
    },
});
