import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ScheduleItem extends Component {

    handleStarClick = (item) => {
        console.log(item);
    };

    render() {
        return (
            <View style={styles.itemBlock}>
                <View style={styles.metaBlock}>
                    <Text style={styles.title}>{this.props.run.runnerName}</Text>
                    <Text style={styles.game}>
                        {this.props.run.game},
                        <Text style={styles.category}> {this.props.run.category} </Text>
                    </Text>
                    <Text style={styles.date}>{this.props.run.startDate}</Text>
                </View>
                <View style={styles.infoBlock}>
                    <Icon name="star" size={30} color="#f3f3f3" onPress={() => this.handleStarClick(this.props.run)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: "#cccccc"
    },
    game: {},
    category: {},
    date: {},

    itemBlock: {
        flexDirection: "row",
        backgroundColor: "#ffffff"
    },
    metaBlock: {
        flex: 1

    },
    infoBlock: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#cccccc"
    }
});
