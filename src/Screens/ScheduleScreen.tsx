import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import ScheduleList from '../Components/Schedule/ScheduleList';
import {LoadHoraro, IRun} from '../Services/ScheduleService';
import {IEvent} from '../Services/EventsService';
import {EventContext} from '../App';

const ScheduleScreen: React.FunctionComponent<NavigationInjectedProps> = () => {
    const context = useContext(EventContext);
    const [runs, setRuns] = useState<IRun[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    async function loadEvents(event: IEvent) {
        try {
            const runs = await LoadHoraro(event.meta.horaro);
            setRuns(runs);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEvents(context.event);
    }, [context.event]);

    if (error) {
        return (
            <View style={styles.loadingScreen}>
                <Text style={styles.error}>Failed fetching events...</Text>
                <Text style={styles.errorMessage}>{error.message}</Text>
            </View>
        );
    }

    return (
        <View style={[loading ? styles.loadingScreen : undefined, styles.container]}>
            {loading ? (
                <ActivityIndicator size="large" color="#ccc" />
            ) : (
                <EventContext.Consumer>
                    {({event}) => <ScheduleList runs={runs} theme={event.meta.theme} />}
                </EventContext.Consumer>
            )}
        </View>
    );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEEF1',
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 20,
        color: '#000',
    },
    errorMessage: {
        marginTop: 10,
        color: '#444',
    },
});
