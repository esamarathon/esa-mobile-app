import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import ScheduleList from '../Components/Schedule/ScheduleList';

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
        setTimeout(() => {
            this.setState({
                runs: [{
                    id: "1",
                    runnerName: "TMR",
                    game: "Cuphead",
                    category: "All Bosses, Pacifist",
                    startDate: "16th April 2019"
                }],
                loading: false
            });

            console.log(this.state);
        }, 1000)
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
