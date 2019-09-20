import React from 'react';
import {NavigationInjectedProps} from 'react-navigation';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MenuButton, NotificationBell} from '../Assets/Icons';

export function MenuBar({navigation}: NavigationInjectedProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                <MenuButton size={20} fill="#881EE8" />
            </TouchableOpacity>
            <Text style={styles.title}>Event: ESA Summer Marathon</Text>
            <View style={styles.notificationButton}>
                <NotificationBell size={24} fill="#881EE8" />
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
