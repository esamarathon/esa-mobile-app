import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import Logo from '../Assets/Logo';
import SeeMoreButton from '../Components/Home/SeeMoreButton';
import SidebarItem from '../Components/Sidebar/SidebarItem';
import MenuBar from '../Components/MenuBar';
import {EventContext} from '../App';

export default function HomeScreen({navigation}: NavigationInjectedProps) {
    const {event} = useContext(EventContext);

    const startDate = dayjs(event.startDate);
    const endDate = dayjs(event.endDate);
    const sameMonth = startDate.month === endDate.month;

    return (
        <>
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
                <View>
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
                <ScrollView horizontal style={styles.scheduleWrapper}>
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
                </ScrollView>
                <SeeMoreButton />
            </View>
        </>
    );
}

HomeScreen.navigationOptions = {};

const styles = StyleSheet.create({
    eventDetails: {
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
    announcement: {
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
    },
    scheduleItem: {
        padding: 10,
        marginLeft: 10,
        minWidth: '60%',
        minHeight: 100,
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
