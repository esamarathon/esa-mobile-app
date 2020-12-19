import React, {useContext, useEffect, useMemo, useRef} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {GroupedVirtuoso, GroupedVirtuosoHandle} from 'react-virtuoso';
import ScheduleCard from './ScheduleCard';
import {IRun} from '../services/ScheduleService';
import {BookmarkContext, IBookmarkContext} from '../App';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 20px 0 0;
  padding: 0 20px 0;
  overflow-x: scroll;
`;

const DayTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  padding-top: 60px;
  padding-bottom: 30px;
  background: #e4e4e4;
  margin: 0;
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
          <ScheduleCard
            run={runs[index]}
            bookmarked={!!runs[index].id && bookmarks.has(runs[index].id)}
            onBookmark={() => runs[index].id && onBookmark(runs[index])}
          />
        )}
      />
    </List>
  );
}

export default ScheduleList;
