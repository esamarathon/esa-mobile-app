import React, {Component} from 'react';
import {Text, FlatList, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {IEvent, LoadEvents} from '../Services/EventsService';
import dayjs from 'dayjs';
import SvgUri from 'react-native-svg-uri';

interface IProps {
    navigation: any;
}

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
                <TouchableOpacity onPress={() => this.handleClick(item)}>
                    <View style={styles.itemContainer}>
                        <View>
                            <SvgUri
                                width={75}
                                height={75}
                                source={{
                                    uri:
                                        'https://esamarathon.com/static/img/logos/logo-borderless.svg',
                                }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{item.name}</Text>
                            <Text>{dayjs(item.startDate).format('dd, DD MMM, YYYY')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
