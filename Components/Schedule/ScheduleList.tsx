import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import ScheduleItem from './ScheduleItem';

export default class ScheduleList extends Component {

    renderItem = ({item}) => (
        <ScheduleItem run={item} />
    );

    keyExtractor = (item) => {
        return item.runnerName;
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
        height: "100%",
        backgroundColor: "#000000"
    }
});
