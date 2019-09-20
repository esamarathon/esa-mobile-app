import React, {useContext} from 'react';
import {NavigationInjectedProps} from 'react-navigation';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MenuIcon, NotificationBellIcon} from '../Assets/Icons';
import {EventContext} from '../App';

export default function MenuBar({navigation}: NavigationInjectedProps) {
    const {event} = useContext(EventContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                <MenuIcon size={20} fill="#881EE8" />
            </TouchableOpacity>
            <Text style={styles.title}>{event.name}</Text>
            <View style={styles.notificationButton}>
                <NotificationBellIcon size={24} fill="#881EE8" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1E3FD',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuButton: {
        padding: 20,
    },
    title: {
        color: '#881EE8',
        fontSize: 16,
        padding: 20,
    },
    notificationButton: {
        padding: 20,
        paddingBottom: 18,
        paddingTop: 18,
    },
});
