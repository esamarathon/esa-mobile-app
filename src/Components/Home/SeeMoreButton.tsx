import React from 'react';
import {GestureResponderEvent, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface IProps {
    onPress?: (event: GestureResponderEvent) => void;
}

export default function SeeMoreButton({onPress}: IProps) {
    return (
        <TouchableOpacity style={styles.seeMoreButton} onPress={onPress}>
            <Text style={styles.seeMoreButtonText}>See more...</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    seeMoreButton: {
        marginHorizontal: 'auto',
        alignSelf: 'center',
    },
    seeMoreButtonText: {
        color: '#881EE8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        fontSize: 16,
    },
});
