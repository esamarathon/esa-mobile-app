import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class AnnouncementItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                <View style={styles.metaText}>
                    <Text style={styles.metaTitle}>Schedule Release</Text>
                    <Text style={styles.itemGrow}>3 days ago</Text>
                </View>
                <Text style={styles.text}>
                    You can now find the schedules for both streams on our website: website:
                    website: https://esamarathon.com/schedule If you wish to re-watch the re-watch
                    re-watch the live reveal, you’ll be able...
                </Text>
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
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    text: {
        color: 'rgba(0, 0, 0, 0.8)',
    },
    itemGrow: {
        flex: 1,
        textAlign: 'right',
        fontSize: 11,
        color: 'rgba(0, 0, 0, .7)',
    },
});
