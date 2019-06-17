import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import {EventContext} from '../App';
import {GetBackgroundColorForEvent} from '../Themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingsScreen: React.FunctionComponent<NavigationInjectedProps> = () => {
    const {updateEvent, event} = useContext(EventContext);

    const backgroundColor = GetBackgroundColorForEvent(event);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon style={styles.cardHeaderIcon} size={20} name="twitch" />
                    <Text style={styles.cardHeaderText}>Twitch</Text>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={() => {}}>
                    <Text style={styles.buttonText}>Login with Twitch</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Event</Text>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={updateEvent}>
                    <Text style={styles.buttonText}>Change event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEEF1',
        padding: 10,
    },
    card: {
        marginTop: 20,
        marginLeft: 20,
    },
    cardHeader: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardHeaderIcon: {
        color: '#000',
        marginRight: 10,
    },
    cardHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'flex-start',
        borderRadius: 3,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    header: {
        fontSize: 18,
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
    },
});
