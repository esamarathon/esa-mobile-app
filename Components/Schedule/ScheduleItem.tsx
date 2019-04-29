import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ScheduleItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            starred: false
        }
    }

    handleStarClick = (item) => {
        console.log(item);
        this.setState({
            starred: true
        })
    };

    render() {
        return (
            <View style={styles.itemBlock}>
                <View style={styles.metaBlock}>
                    <Text style={styles.title}>{this.props.run['Player(s)']}</Text>
                    <Text style={styles.game}>
                        {this.props.run.Game},
                        <Text style={styles.category}> {this.props.run.Category} </Text>
                    </Text>
                    <Text style={styles.date}>{this.props.run.startDate}</Text>
                </View>
                <View style={styles.infoBlock}>
                    <Icon name="star" size={30} color={this.state.starred ? "yellow" : "#f3f3f3"} onPress={() => this.handleStarClick(this.props.run)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
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
