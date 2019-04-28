import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import ScheduleList from '../Components/Schedule/ScheduleList';

import {LoadHoraro} from '../Services/ScheduleService';

export default class ScheduleScreen extends Component {
    static navigationOptions = {
        title: 'Schedule',
    };

    constructor(props) {
        super(props);

        this.state = {
            runs: [],
            loading: true
        }
    }

    componentWillMount() {
        LoadHoraro().then((response) => {
            this.setState({
                runs: response,
                loading: false
            })
        })
    }

    render() {
        return (
            <View>
                <ScheduleList runs={this.state.runs} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
