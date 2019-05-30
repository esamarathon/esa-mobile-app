import React, {Component} from 'react';
import {Button, Text, FlatList, StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import {IEvent, LoadEvents} from '../Services/EventsService';
import dayjs from 'dayjs';

interface IState {
    events: IEvent[];
    loading: boolean;
}

export default class EventsScreen extends Component {
    static navigationOptions = {
        title: 'Events',
    };

    state: IState = {
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

    _keyExtractor = (item: IEvent) => item._id;

    render() {
        const {events} = this.state;

        const ListItem = (item: IEvent) => {
            return (
                <TouchableHighlight onPress={() => this.handleClick(item)}>
                    <View style={styles.itemContainer}>
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri:
                                        'https://yt3.ggpht.com/a/AGF-l7_Y0kmUs07Bg-iluLsdRXpBeBwoPNqrMrBtmg=s900-mo-c-c0xffffffff-rj-k-no',
                                }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{item.name}</Text>
                            <Text>{dayjs(item.startDate).toString()}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        };

        return (
            <View style={styles.container}>
                <FlatList
                    data={events}
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
        backgroundColor: '#F5FCFF',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 12,
    },
    image: {
        width: 75,
        height: 75,
    },
});
