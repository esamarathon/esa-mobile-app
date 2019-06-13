import React, {Component} from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import SvgUri from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';
import {IEvent, LoadEvents} from '../Services/EventsService';
import {EventCard} from '../Components/Event/EventCard';

interface IState {
    events: IEvent[];
    loading: boolean;
}

export default class EventsScreen extends Component<NavigationInjectedProps, IState> {
    state = {
        events: [],
        loading: true,
    };

    componentDidMount() {
        LoadEvents().then((res: IEvent[]) => {
            this.setState({
                loading: false,
                events: res,
            });
        });
    }

    handleClick = (item: IEvent) => {
        this.props.navigation.navigate('Details', {
            event: item,
        });
    };

    _keyExtractor = (item: IEvent) => item._id.substring(0, 1);

    render() {
        const {events} = this.state;

        const ListItem = (item: IEvent) => {
            return <EventCard event={item} handleClick={this.handleClick} />;
        };

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
                        <SvgUri
                            width={60}
                            height={60}
                            source={{
                                uri: 'https://esamarathon.com/static/img/logos/logo-borderless.svg',
                            }}
                        />
                    </View>

                    <View style={styles.infoText}>
                        <Text style={styles.eventTitle}>Pick your event</Text>
                        <Text style={styles.eventDescription}>
                            Don&apos;t worry, you can always switch between events later
                        </Text>
                    </View>

                    <FlatList
                        data={events}
                        horizontal={true}
                        renderItem={({item}) => ListItem(item)}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </LinearGradient>
        );
    }
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
    },
    infoText: {
        paddingLeft: 40,
        paddingRight: 130,
        marginBottom: 50,
        color: '#ffffff',
    },
});
