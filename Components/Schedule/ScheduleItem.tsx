import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IRun} from '../../Services/ScheduleService';

interface IProps {
    run: IRun;
}

export default class ScheduleItem extends Component<IProps> {
    handleStarClick = (item: IRun) => {
        console.log(item);
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
                </View>
                <View style={styles.infoBlock}>
                    <Icon
                        name="star"
                        size={30}
                        color="#f3f3f3"
                        onPress={() => this.handleStarClick(this.props.run)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {},
    game: {},
    category: {},
    date: {},

    itemBlock: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    metaBlock: {
        flex: 1,
    },
    infoBlock: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cccccc',
    },
});
