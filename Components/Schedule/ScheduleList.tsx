import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import ScheduleItem from './ScheduleItem';
import {IRun} from '../../Services/ScheduleService';

interface IProps {
    runs: IRun[];
}

export default class ScheduleList extends Component<IProps> {
    renderItem = ({item}: {item: IRun}) => <ScheduleItem run={item} />;

    keyExtractor = (item: IRun, index: number) => {
        return `run-name-${index}`;
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.runs}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000000'
    }
});
