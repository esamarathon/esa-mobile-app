import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import ScheduleList from '../Components/Schedule/ScheduleList';
import {LoadHoraro, IRun} from '../Services/ScheduleService';
import {EventContext} from '../App';

interface IState {
    runs: IRun[];
    error: Error | undefined;
    loading: boolean;
}

export default class ScheduleScreen extends Component {
    static navigationOptions = {
        title: 'Schedule',
    };

    state: IState = {
        runs: [],
        error: undefined,
        loading: true,
    };

    async componentDidMount() {
        try {
            const runs = await LoadHoraro();

            this.setState({
                runs,
            });
        } catch (error) {
            this.setState({
                error,
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const {loading, runs} = this.state;

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
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEEF1',
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
