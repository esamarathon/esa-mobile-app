import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IEvent} from '../../Services/EventsService';
import dayjs from 'dayjs';

interface IProps {
    event: IEvent;
    handleClick: (item: IEvent) => void;
}

export class EventCard extends React.Component<IProps> {
    render() {
        const {event, handleClick} = this.props;

        return (
            <TouchableOpacity style={styles.card} onPress={() => handleClick(event)}>
                <View style={styles.graphic}>
                    <Image source={require('../../Assets/graphics/graphic.png')} />
                </View>
                <Text style={styles.title}>{event.name}</Text>
                <View>
                    <View style={styles.meta}>
                        <Text>
                            {dayjs(event.startDate).format('D')} -{' '}
                            {dayjs(event.endDate).format('D MMMM')}
                        </Text>
                    </View>
                    <View style={styles.meta}>
                        <Text style={styles.metaText}>In</Text>
                        <Text style={styles.bold}>Malmö, Sweden</Text>
                    </View>
                    <View style={styles.meta}>
                        <Text>For</Text>
                        <Text style={styles.bold}>
                            {event.meta ? event.meta.cause.name : 'Missing Cause'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    metaText: {
        width: 21,
    },
    card: {
        position: 'relative',
        height: 255,
        width: 195,
        borderRadius: 18,
        backgroundColor: '#fff',
        marginHorizontal: 30,
        paddingBottom: 37,
        flex: 1,
        justifyContent: 'flex-end',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 5,
    },
    bold: {
        fontWeight: 'bold',
        marginLeft: 6,
    },
    meta: {
        paddingHorizontal: 30,
        flexDirection: 'row',
    },
    title: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
    graphic: {
        position: 'absolute',
        top: 0,
    },
});
