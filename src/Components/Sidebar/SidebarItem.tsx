import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
    name: string;
}

export default function SidebarItem(props: IProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: '#8424E2',
        fontSize: 18,
        marginVertical: 12,
    },
});
