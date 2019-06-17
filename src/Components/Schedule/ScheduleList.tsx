import React, {Component} from 'react';
import {StyleSheet, SectionList, Text, View} from 'react-native';
import * as moment from 'moment';
import ScheduleItem from './ScheduleItem';
import {IRun} from '../../Services/ScheduleService';
import {IEventTheme} from '../../Services/EventsService';
import {Theme} from '../../Themes';

interface IProps {
    runs: IRun[];
    theme: IEventTheme;
}

interface IState {
    openedRun: IRun | undefined;
}

export default class ScheduleList extends Component<IProps, IState> {
    state = {
        openedRun: undefined,
    };

    onClick = (run: IRun | undefined) => {
        this.setState({openedRun: run});
    };

    render() {
        const {runs, theme} = this.props;
        const {openedRun} = this.state;

        const filteredRuns = runs.reduce<{[x: string]: IRun[]}>((days, run) => {
            const day = moment.default(run.scheduled_t * 1000).format('YYYY-MM-DD');

            return {
                ...days,
                [day]: (days[day] || []).concat(run),
            };
        }, {});

        const ThemedBackground = {
            backgroundColor: Theme[theme].backgroundColor,
            color: Theme[theme].textColor,
        };

        return (
            <View>
                <SectionList
                    sections={Object.entries(filteredRuns).map(([day, runs]) => ({
                        title: day,
                        data: runs,
                    }))}
                    keyExtractor={(run) => run.scheduled_t + run.Game + run['Player(s)']}
                    renderItem={({item}) => (
                        <ScheduleItem open={openedRun === item} onClick={this.onClick} run={item} />
                    )}
                    renderSectionHeader={({section: {data}}) => (
                        <Text style={[styles.sectionHeader, ThemedBackground]}>
                            {moment.default(data[0].scheduled_t * 1000).format('ddd, MMMM Do')}
                        </Text>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
