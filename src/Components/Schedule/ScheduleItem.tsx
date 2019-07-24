import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IRun, extractLinks} from '../../Services/ScheduleService';

interface IProps {
    run: IRun;
    open: boolean;
    onClick: (run: IRun | undefined) => void;
}

function ScheduleItem({run, open, onClick}: IProps) {
    const [starred, setStarred] = useState(false);

    const players =
        extractLinks(run['Player(s)'])
            .map(({name}) => name)
            .join(' vs ')
            .trim() ||
        run['Player(s)'] ||
        'Unknown players';

    const game =
        extractLinks(run.Game)
            .map(({name}) => name)
            .join(', ')
            .trim() ||
        run.Game ||
        'Unknown game';

    const date = dayjs(run.scheduled_t * 1000);

    const category = run.Category ? run.Category.trim() || undefined : undefined;

    return (
        <TouchableOpacity onPress={() => onClick(open ? undefined : run)}>
            <View style={[styles.itemBlock, open ? styles.openItemBlock : undefined]}>
                <View style={styles.timeBlock}>
                    <Text style={styles.time}>{date.format('HH:mm')}</Text>
                </View>
                <View style={styles.metaBlock}>
                    <Text style={styles.game}>
                        {game}
                        {category ? <Text style={styles.category}> - {category}</Text> : null}
                    </Text>
                    <Text style={styles.title}>{players}</Text>
                    {open ? (
                        <>
                            {run.Info ? <Text>Info: {run.Info}</Text> : null}
                            {run.Layout ? <Text>Layout: {run.Layout}</Text> : null}
                            {run.Note ? <Text>Note: {run.Note}</Text> : null}
                            {run.Platform ? <Text>Platform: {run.Platform}</Text> : null}
                        </>
                    ) : null}
                </View>
                <TouchableOpacity
                    style={[styles.infoBlock, starred ? styles.starredInfoBlock : undefined]}
                    onPress={() => setStarred(!starred)}
                >
                    <Icon
                        name={starred ? 'bell-ring' : 'bell-off-outline'}
                        color={starred ? '#fff' : '#ccc'}
                        size={starred ? 18 : 22}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

function propsAreEqual(prevProps: IProps, nextProps: IProps) {
    return prevProps.run == nextProps.run && prevProps.open == nextProps.open;
}

export default memo(ScheduleItem, propsAreEqual);

const styles = StyleSheet.create({
    game: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
    },
    title: {
        fontWeight: 'bold',
    },
    category: {
        fontWeight: 'normal',
    },
    itemBlock: {
        flex: 1,
        paddingLeft: 10,
        paddingVertical: 5,
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    openItemBlock: {
        backgroundColor: '#fff',
    },
    metaBlock: {
        flex: 1,
    },
    infoBlock: {
        flex: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        height: 40,
        width: 40,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#e2e2e2',
    },
    starredInfoBlock: {
        backgroundColor: '#444',
        borderColor: '#444',
    },
    duration: {},
    time: {
        fontSize: 13,
        marginTop: 3,
    },
    timeBlock: {
        flex: 0,
        marginRight: 10,
        textAlign: 'right',
    },
});
