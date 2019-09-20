import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const SidebarItem = (props: any) => (
    <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EFE4FB',
    },
    text: {
        color: '#8424E2',
        fontSize: 18,
        marginVertical: 12,
    },
});
