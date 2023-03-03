import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {styled} from '@mui/material/styles';
import dayjs from 'dayjs';
import {GroupedVirtuoso, GroupedVirtuosoHandle} from 'react-virtuoso';
import ScheduleCard from './ScheduleCard';
import {IRun} from '../services/ScheduleService';
import {BookmarkContext, IBookmarkContext} from '../App';

const List = styled('div')`
  margin-top: 24px;
  height: calc(100vh - 150px);
`;

const DayTitle = styled('div')(
  ({theme}) => `
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: #fff;
  padding: 12px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(0deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%);
  margin: 0;
`,
);

const IndentCards = styled('div')`
  margin-top: 12px;
  padding: 0 12px;
`;

function transformGroups(schedule: IProps['schedule']) {
  const groupsCount = schedule.map((runs) => runs[1].length);
  const runs = schedule.flatMap((runs) => runs[1]);

  return {
    groupsCount,
    runs,
  };
}

interface IProps {
  scrollToDate?: string;
  schedule: [string, IRun[]][];
}

function ScheduleList({scrollToDate, schedule}: IProps) {
  const {bookmarks, onBookmark} = useContext(BookmarkContext) as IBookmarkContext;
  const virtuoso = useRef<GroupedVirtuosoHandle>(null);
  const {groupsCount, runs} = useMemo(() => transformGroups(schedule), [schedule]);

  useEffect(() => {
    const scrollGroupIndex = schedule.findIndex((x) => x[0] === scrollToDate);
    const scrollItemIndex = groupsCount.slice(0, scrollGroupIndex).reduce((a, b) => a + b, 0);
    if (scrollGroupIndex > -1) {
      virtuoso.current?.scrollToIndex({
        index: scrollItemIndex,
        align: 'start',
        behavior: 'smooth',
      });
    }
  }, [groupsCount, schedule, scrollToDate]);

  return (
    <List>
      <GroupedVirtuoso
        ref={virtuoso}
        groupCounts={groupsCount}
        groupContent={(index) => (
          <DayTitle id={schedule[index][0]}>
            {dayjs(schedule[index][0]).format('dddd D/M')}
          </DayTitle>
        )}
        itemContent={(index) => (
          <IndentCards>
            <ScheduleCard
              run={runs[index]}
              bookmarked={!!runs[index].id && bookmarks.has(runs[index].id)}
              onBookmark={() => runs[index].id && onBookmark(runs[index])}
            />
          </IndentCards>
        )}
      />
    </List>
  );
}

export default ScheduleList;
