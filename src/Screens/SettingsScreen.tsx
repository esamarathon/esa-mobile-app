import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {EventContext} from '../App';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationInjectedProps} from 'react-navigation';

// This is just fake user data for now PoC purpose
interface IUser {
    name: string;
    status: string;
}

interface IState {
    user: IUser | null;
}

export default class ScheduleScreen extends Component<NavigationInjectedProps> {
    state: IState = {
        user: null,
    };

    updateUser = () => {
        this.setState({
            user: {
                name: 'Edenal',
                status: 'Organiser',
            },
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>

                {this.state.user ? (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Image
                                source={{
                                    uri:
                                        'https://pbs.twimg.com/profile_images/647526574120529920/T5rm0m7W.jpg',
                                }}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.userText}>
                            <Text>{this.state.user.name}</Text>
                            <Text>{this.state.user.status}</Text>
                        </View>
                    </View>
                ) : null}

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon style={styles.cardHeaderIcon} size={20} name="twitch" />
                        <Text style={styles.cardHeaderText}>Twitch</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
                        <Text style={styles.buttonText}>Login with Twitch</Text>
                    </TouchableOpacity>
                </View>
                <EventContext.Consumer>
                    {({updateEvent}) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardHeaderText}>Event</Text>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => updateEvent()}>
                                <Text style={styles.buttonText}>Change event</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </EventContext.Consumer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEEF1',
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
        backgroundColor: 'purple',
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
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
    },
    userText: {
        marginLeft: 20,
        flexDirection: 'column',
    },
});
