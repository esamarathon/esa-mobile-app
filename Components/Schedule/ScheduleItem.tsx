import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {IRun, extractLinks} from '../../Services/ScheduleService';

interface IProps {
    run: IRun;
    open: boolean;
    onClick: (run: IRun | undefined) => void;
}

export default class ScheduleItem extends PureComponent<IProps> {
    handleStarClick = (item: IRun) => {
        console.log(item);
    };

    render() {
        const {run, onClick, open} = this.props;

        const players = extractLinks(run['Player(s)'])
            .map(({name}) => name)
            .join(' vs ');

        const game = extractLinks(run.Game)
            .map(({name}) => name)
            .join(', ');

        const date = moment.default(run.scheduled_t * 1000);

        const category = run.Category
            ? run.Category.replace('Any%', '').trim() || undefined
            : undefined;

        return (
            <TouchableOpacity onPress={() => onClick(open ? undefined : run)}>
                <View style={styles.itemBlock}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.time}>{date.format('HH:mm')}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.title}>{players}</Text>
                        <Text style={styles.game}>
                            {game}
                            {category ? <Text style={styles.category}> - {category}</Text> : null}
                        </Text>
                        {open ? (
                            <>
                                {run.Info ? <Text>Info: {run.Info}</Text> : null}
                                {run.Layout ? <Text>Layout: {run.Layout}</Text> : null}
                                {run.Note ? <Text>Note: {run.Note}</Text> : null}
                                {run.Platform ? <Text>Platform: {run.Platform}</Text> : null}
                            </>
                        ) : null}
                    </View>
                    {open ? (
                        <View style={styles.infoBlock}>
                            <Icon
                                name="heart"
                                size={22}
                                onPress={() => this.handleStarClick(run)}
                            />
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
    },
    game: {
        fontWeight: 'bold',
    },
    category: {
        fontWeight: 'normal',
    },
    date: {},
    itemBlock: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 5,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    metaBlock: {
        flex: 1,
    },
    infoBlock: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    duration: {},
    time: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 3,
    },
    timeBlock: {
        flex: 0,
        marginRight: 10,
        textAlign: 'right',
    },
});
