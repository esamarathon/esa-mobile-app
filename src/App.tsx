import React, {Component} from 'react';
import {ActivityIndicator, Text, StyleSheet} from 'react-native';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import {IEvent, LoadEvents} from './Services/EventsService';
import EventsScreen from './Screens/EventsScreen';

interface IState {
    events: IEvent[];
    preferredEvent: IEvent | undefined;
    showEventPicker: boolean;
    loading: boolean;
    error: boolean;
}

interface IContext {
    event: IEvent;
    events: IEvent[];
    updateEvent: () => void;
}

export const EventContext = React.createContext<IContext>({} as IContext);

const Navigation: NavigationContainer = createAppContainer(TabNavigator);

export default class AppContainer extends Component<{}, IState> {
    static preferredEventKey = '@ESA:preferredEventId';

    state: IState = {
        events: [],
        preferredEvent: undefined,
        showEventPicker: false,
        loading: true,
        error: false,
    };

    updateEvent = async (event: IEvent) => {
        this.setState({
            preferredEvent: event,
            showEventPicker: false,
        });

        await AsyncStorage.setItem(AppContainer.preferredEventKey, event._id);
    };

    async componentDidMount() {
        const preferredEventId = await AsyncStorage.getItem(AppContainer.preferredEventKey);

        try {
            const events = await LoadEvents();

            const preferredEvent = events.find(
                (event) => preferredEventId && event._id === preferredEventId,
            );

            this.setState({
                events: events,
                preferredEvent: preferredEvent,
                showEventPicker: preferredEvent === undefined,
                loading: false,
            });
        } catch (error) {
            this.setState({
                events: [],
                error: true,
                loading: false,
            });
        }
    }

    render() {
        const {preferredEvent, events, showEventPicker, loading, error} = this.state;

        if (loading) {
            return <ActivityIndicator size="large" color="#ccc" style={styles.loadingView} />;
        }

        if (error) {
            return <Text>Something went wrong</Text>;
        }

        return (
            <EventContext.Provider
                value={{
                    events: events,
                    event: preferredEvent as IEvent,
                    updateEvent: () => {
                        this.setState({
                            showEventPicker: true,
                        });
                    },
                }}
            >
                {showEventPicker ? (
                    <EventsScreen onPickEvent={this.updateEvent} />
                ) : (
                    <Navigation screenProps={{theme: preferredEvent as IEvent}} />
                )}
            </EventContext.Provider>
        );
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
});
