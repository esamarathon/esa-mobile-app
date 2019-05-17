import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import ScheduleList from '../Components/Schedule/ScheduleList';
import {LoadHoraro, IRun} from '../Services/ScheduleService';

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
            console.error(error);

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
            <View style={loading ? styles.loadingScreen : undefined}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ccc" />
                ) : (
                    <ScheduleList runs={runs} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
