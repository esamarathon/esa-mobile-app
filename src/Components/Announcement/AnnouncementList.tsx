import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AnnouncementItem from './AnnouncementItem';

export default class AnnouncementList extends Component {
    render() {
        return (
            <View style={styles.announcement}>
                <Text style={styles.textTitle}>Announcements</Text>
                <View style={styles.innerContainer}>
                    <AnnouncementItem />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerEventContainer: {
        paddingTop: 20,
    },
    announcement: {
        marginTop: 60,
    },
    innerContainer: {
        paddingHorizontal: 24,
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
