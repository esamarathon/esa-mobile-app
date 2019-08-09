import React from 'react';
import {ActivityIndicator, Text, StyleSheet} from 'react-native';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import EventsScreen from './Screens/EventsScreen';
import {useEvents} from './Hooks/useEvents';
import {useFirebase} from './Hooks/useFirebase';
import {IEvent} from './Services/EventsService';

interface IContext {
    event: IEvent;
    events: IEvent[];
    updateEvent: () => void;
}

export const EventContext = React.createContext<IContext>({} as IContext);

const Navigation: NavigationContainer = createAppContainer(TabNavigator);

export default function AppContainer() {
    const {loading, error, preferredEvent, updateEvent, events} = useEvents();
    useFirebase();

    if (loading) {
        return <ActivityIndicator size="large" color="#ccc" style={styles.loadingView} />;
    }

    if (error) {
        return <Text>Something went wrong...</Text>;
    }

    if (!preferredEvent) {
        return <EventsScreen events={events} onPickEvent={updateEvent} />;
    }

    return (
        <EventContext.Provider
            value={{
                events: events,
                event: preferredEvent,
                updateEvent: () => updateEvent(undefined),
            }}
        >
            <Navigation screenProps={{theme: preferredEvent}} />
        </EventContext.Provider>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
});
