import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {IEvent, LoadEvents} from '../Services/EventsService';
import * as moment from 'moment';
interface IProps {}

interface IState {
    events: IEvent[];
    loading: boolean;
}

export default class EventsScreen extends Component<IProps, IState> {
    static navigationOptions = {
        title: 'Events',
    };

    state = {
        events: [],
        loading: true,
    };

    componentDidMount() {
        LoadEvents().then((res: IEvent[]) => {
            console.log(res);

            this.setState({
                loading: false,
                events: res,
            });
        });
    }

    _keyExtractor = (item: IEvent) => item._id;

    render() {
        const {events} = this.state;

        const ListItem = (item: IEvent) => {
            return (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{moment.default(item.startDate).format('ddd, MMMM Do')}</Text>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
