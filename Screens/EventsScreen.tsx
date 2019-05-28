import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {IEvent, LoadEvents} from '../Services/EventsService';
import {EventContext} from '../App';

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
                <EventContext.Consumer>
                    {({updateEvent}) => (
                        <View>
                            <Button title={item.name} onPress={() => updateEvent(item)} />
                        </View>
                    )}
                </EventContext.Consumer>
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
