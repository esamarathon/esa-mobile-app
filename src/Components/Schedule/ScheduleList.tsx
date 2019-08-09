import React, {useState, useMemo} from 'react';
import {StyleSheet, SectionList, SectionListData, Text} from 'react-native';
import dayjs from 'dayjs';
import ScheduleItem from './ScheduleItem';
import {IRun} from '../../Services/ScheduleService';
import {IEvent} from '../../Services/EventsService';
import {GetBackgroundColorForEvent, GetTextColorForEvent} from '../../Themes';

interface IProps {
    runs: IRun[];
    event: IEvent;
}

function ScheduleList({runs, event}: IProps) {
    const [openedRun, setOpenedRun] = useState<IRun | undefined>();

    const groupedRuns = useMemo(
        () =>
            Object.entries(
                runs.reduce<{[x: string]: IRun[]}>((days, run) => {
                    const day = dayjs(run.scheduled_t * 1000).format('YYYY-MM-DD');

                    return {
                        ...days,
                        [day]: (days[day] || []).concat(run),
                    };
                }, {}),
            ).map(([day, runs]) => ({
                title: day,
                data: runs,
            })),
        [runs],
    );

    const headerTheme = {
        backgroundColor: GetBackgroundColorForEvent(event),
        color: GetTextColorForEvent(event),
    };

    return (
        <SectionList
            sections={groupedRuns}
            keyExtractor={(run: IRun) => run.scheduled_t + (run.Game || '') + run['Player(s)']}
            renderItem={({item}: {item: IRun}) => (
                <ScheduleItem open={openedRun === item} onClick={setOpenedRun} run={item} />
            )}
            ListHeaderComponent={<Text style={styles.header}>Schedule</Text>}
            renderSectionHeader={({section: {data}}: {section: SectionListData<IRun>}) => (
                <Text style={[styles.sectionHeader, headerTheme]}>
                    {dayjs(data[0].scheduled_t * 1000).format('ddd, MMMM D')}
                </Text>
            )}
        />
    );
}

export default ScheduleList;

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 18,
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
    },
});
