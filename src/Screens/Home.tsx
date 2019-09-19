import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import dayjs from 'dayjs';
import {Logo} from '../Assets/Logo';
import {MenuBar} from '../Components/MenuBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SeeMoreButton} from '../Components/Home/SeeMoreButton';

export function HomeScreen({navigation}: NavigationInjectedProps) {
    const startDate = dayjs(new Date());
    const endDate = dayjs(new Date());
    const sameMonth = startDate.month === endDate.month;

    return (
        <View style={styles.container}>
            <MenuBar navigation={navigation} />
            <View style={styles.eventDetails}>
                <View style={styles.eventDetailsLogoContainer}>
                    <Logo size={100} />
                </View>
                <View style={styles.eventDetailsContent}>
                    <Text style={styles.eventDetailsContentText}>
                        {startDate.format('D')}
                        {sameMonth ? '' : ' ' + startDate.format('MMM')} - {endDate.format('D')}{' '}
                        {endDate.format('MMM')}
                    </Text>
                    <Text style={styles.eventDetailsContentText}>Quality Hotel View,</Text>
                    <Text style={styles.eventDetailsContentText}>Malmo</Text>
                </View>
            </View>
            <View style={styles.block}>
                <Text style={styles.blockHeader}>Announcements</Text>
                <View style={styles.announcementsWrapper}>
                    <TouchableOpacity style={[styles.announcement, styles.card]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Main title</Text>
                            <Text style={styles.cardTime}>8/2 14:00</Text>
                        </View>
                        <View>
                            <Text style={styles.cardContent}>More information etc...</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.announcement, styles.card]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Main title</Text>
                            <Text style={styles.cardTime}>8/2 14:00</Text>
                        </View>
                        <View>
                            <Text style={styles.cardContent}>More information etc...</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <SeeMoreButton />
            </View>
            <View style={styles.block}>
                <Text style={styles.blockHeader}>Upcoming Schedule Events</Text>
                <View style={styles.scheduleWrapper}>
                    <TouchableOpacity style={[styles.scheduleItem, styles.card]}>
                        <Text style={styles.cardTitle}>Main title</Text>
                        <Text style={styles.cardTime}>8/2 - 14:30</Text>
                        <Text style={styles.cardContent}>More information etc...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.scheduleItem, styles.card]}>
                        <Text style={styles.cardTitle}>Main title</Text>
                        <Text style={styles.cardTime}>8/2 - 14:30</Text>
                        <Text style={styles.cardContent}>More information etc...</Text>
                    </TouchableOpacity>
                </View>
                <SeeMoreButton />
            </View>
        </View>
    );
}

HomeScreen.navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
        <Image
            source={{
                uri: 'https://cdn3.iconfinder.com/data/icons/menu-icons-1/100/menu-512.png',
            }}
            style={[styles.icon]}
        />
    ),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1E3FD',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    eventDetailsLogoContainer: {
        padding: 20,
    },
    eventDetailsLogo: {
        width: 100,
    },
    eventDetailsContent: {
        marginHorizontal: 30,
    },
    eventDetailsContentText: {
        textAlign: 'center',
        color: '#881EE8',
        fontSize: 18,
    },
    block: {
        marginTop: 20,
    },
    blockHeader: {
        color: '#881EE8',
        fontSize: 18,
        margin: 20,
        marginVertical: 10,
        paddingTop: 0,
        paddingBottom: 10,
        borderBottomColor: '#881EE8',
        borderBottomWidth: 1,
    },
    card: {
        backgroundColor: '#f1e3fd',
        borderRadius: 10,
    },
    cardHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        color: '#881EE8',
    },
    cardTime: {
        color: '#881EE8',
    },
    cardContent: {
        marginVertical: 5,
        color: '#881EE8',
        opacity: 0.4,
    },
    announcementsWrapper: {},
    announcement: {
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
    },
    scheduleItem: {
        padding: 10,
        marginLeft: 10,
        minWidth: '50%',
    },
    scheduleWrapper: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        margin: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
});
