import React, {createContext} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerContentComponentProps} from 'react-navigation-drawer';
import Sidebar from './Components/Sidebar/Sidebar';
import HomeScreen from './Screens/Home';
import ScheduleScreen from './Screens/Schedule';
import {IEvent} from './Services/EventsService';
import {useFirebase} from './Hooks/useFirebase';
import {useEvents} from './Hooks/useEvents';
import {Theme, ITheme} from './Themes';

const MainNavigation = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Schedule: {
            screen: ScheduleScreen,
        },
    },
    {
        contentOptions: {
            activeBackgroundColor: 'transparent',
            itemStyle: {
                alignSelf: 'center',
            },
            labelStyle: {
                fontSize: 16,
            },
            activeLabelStyle: {
                color: '#881AE8',
            },
            inactiveLabelStyle: {
                color: '#881AE888',
            },
        },
        drawerType: 'front',
        contentComponent: Sidebar as React.FunctionComponent<DrawerContentComponentProps>,
    },
);

const AppContainer = createAppContainer(MainNavigation);

interface IContext {
    event: IEvent;
    events: IEvent[];
    theme: ITheme;
    updateEvent: (event?: IEvent) => void;
}

export const EventContext = createContext<IContext>({} as IContext);

export function App() {
    const {loading, error, preferredEvent, updateEvent, events} = useEvents();
    useFirebase();

    if (loading) {
        return <ActivityIndicator size="large" color="#ccc" style={styles.loadingView} />;
    }

    if (error) {
        return (
            <View style={styles.loadingView}>
                <Text style={styles.loadingViewText}>Something went wrong...</Text>
            </View>
        );
    }

    if (!preferredEvent) {
        return (
            <View style={styles.loadingView}>
                <Text style={styles.loadingViewText}>No active events...</Text>
            </View>
        );
    }

    return (
        <EventContext.Provider
            value={{
                events: events,
                event: preferredEvent,
                theme: Theme[preferredEvent.meta.theme],
                updateEvent: (event?: IEvent) => updateEvent(event),
            }}
        >
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <AppContainer screenProps={{theme: preferredEvent}} />
                </View>
            </SafeAreaView>
        </EventContext.Provider>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#f1e3fd',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingViewText: {
        textAlign: 'center',
        fontSize: 16,
    },
});
