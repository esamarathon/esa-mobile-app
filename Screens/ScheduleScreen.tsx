import React, {Component} from 'react';
import {View} from 'react-native';
import ScheduleList from '../Components/Schedule/ScheduleList';
import {LoadHoraro, IRun} from '../Services/ScheduleService';

interface IState {
    runs: IRun[];
    loading: boolean;
}

export default class ScheduleScreen extends Component {
    static navigationOptions = {
        title: 'Schedule',
    };

    state: IState = {
        runs: [],
        loading: true,
    };

    async componentDidMount() {
        try {
            const runs = await LoadHoraro();
            this.setState({
                loading: false,
                runs,
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View>
                <ScheduleList runs={this.state.runs} />
            </View>
        );
    }
}
