import React, {Component} from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import SvgUri from 'react-native-svg-uri';
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
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <SvgUri
                        width={75}
                        height={75}
                        source={{
                            uri: 'https://esamarathon.com/static/img/logos/logo-borderless.svg',
                        }}
                    />
                </View>

                <View style={styles.infoText}>
                    <Text style={styles.eventTitle}>Pick your event</Text>
                    <Text>Don&apos;t worry, you can always switch between events later</Text>
                </View>

                <FlatList
                    data={events}
                    horizontal={true}
                    renderItem={({item}) => ListItem(item)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    eventTitle: {
        fontSize: 24,
    },
    infoText: {
        paddingLeft: 40,
        paddingRight: 130,
        marginBottom: 50,
    },
});
