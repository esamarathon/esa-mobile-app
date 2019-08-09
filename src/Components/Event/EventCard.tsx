import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {IEvent} from '../../Services/EventsService';
import dayjs from 'dayjs';
import {GetBackgroundColorForEvent, GetActiveTintForEvent} from '../../Themes';

interface IProps {
    event: IEvent;
    handleClick: (item: IEvent) => void;
}

export default function EventCard({event, handleClick}: IProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handleClick(event)}
        >
            <Svg style={styles.graphicSvg} viewBox="0 0 194 92" fill="none">
                <Path
                    d="M68.9998 92H193.999V16.5393C193.999 4.13481 183.999 0.34456 179 0H17.5C7.77911 0 -1.17885e-05 8.50009 0 16.5393V35.1461C1.17047e-05 80.2176 46.1665 91.8277 68.9998 92Z"
                    fill={GetBackgroundColorForEvent(event)}
                />
                <Path
                    d="M103.737 70.9817H194V14C194 8 187 0 179.295 0H54V27.1166C54 61.8908 87.2783 70.8487 103.737 70.9817Z"
                    fill={GetActiveTintForEvent(event)}
                />
            </Svg>
            <Text style={styles.title}>{event.name}</Text>
            <View>
                <View style={styles.meta}>
                    <Text>
                        {dayjs(event.startDate).format('D')} -{' '}
                        {dayjs(event.endDate).format('D MMMM')}
                    </Text>
                </View>
                {event.meta.venue.country ? (
                    <View style={styles.meta}>
                        <Text style={styles.metaText}>in</Text>
                        <Text style={styles.bold}>
                            {event.meta.venue.city}, {event.meta.venue.country}
                        </Text>
                    </View>
                ) : null}
                {event.meta && event.meta.cause.name ? (
                    <View style={styles.meta}>
                        <Text>for</Text>
                        <Text style={styles.bold}>{event.meta.cause.name}</Text>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    metaText: {
        width: 21,
    },
    card: {
        position: 'relative',
        height: 255,
        width: 194,
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
    graphicSvg: {
        position: 'absolute',
        top: -5,
        borderRadius: 18,
        width: 194,
        height: 100,
    },
});
