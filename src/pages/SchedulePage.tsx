import React, {useMemo, useState} from 'react';
import Toolbar from '../components/Toolbar';
import {StyledHeader, StyledHeaderWrapper} from '../components/common/HeaderBar';
import { styled } from '@mui/material/styles';
import useSWR from 'swr';
import {IScheduleResponse, loadFromHoraro} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';
import ScheduleList from '../components/ScheduleList';
import dayjs from 'dayjs';

const Content = styled('div')`
  background-color: var(--ion-background);
`;

const DayScroller = styled('ul')`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  justify-content: center;
  list-style-type: none;
  padding: 0 15px 15px 0;
  margin: 0 15px;
`;

const ScrollItem = styled('li')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 15px;
`;

const ScrollLink = styled('button')`
  text-decoration: none;
  background: transparent;
  outline: none;
  padding: 8px 0;
  margin: 0;
  color: #fff;
  font-size: 12px;
`;

const ScrollBorder = styled('span')`
  width: 130%;
  border-radius: 3px;
  height: 3px;
  background: #fff;
  margin-top: 4px;
`;

const ErrorMessage = styled('span')`
  display: block;
  margin-top: 60px;
  padding: 0 15px;
`;

interface IProps {
  event: IEvent;
}

function SchedulePage({event}: IProps) {
  console.log(event);

  const {data, error, isValidating} = useSWR(
    event.meta.horaro ? `schedule/${encodeURIComponent(event.meta.horaro)}1` : null,
    (path: string) => loadFromHoraro<IScheduleResponse>(path),
  );
  const schedule = useMemo(() => (data ? Object.entries(data.data) : []), [data]);
  const [scrollToDate, setScrollToDate] = useState<string>();

  return (
    <div>
      <StyledHeaderWrapper>
        <StyledHeader>
          <Toolbar>Schedule</Toolbar>
          {schedule.length === 0 ? null : (
            <DayScroller>
              {schedule.map(([date]) => (
                <ScrollLink key={date} onClick={() => setScrollToDate(date)}>
                  <ScrollItem>
                    {dayjs(date).format('ddd')}
                    <ScrollBorder />
                  </ScrollItem>
                </ScrollLink>
              ))}
            </DayScroller>
          )}
        </StyledHeader>
      </StyledHeaderWrapper>
      <Content>
        {isValidating ? (
          <p>We be loading</p>
        ) : error ? (
          <ErrorMessage>Failed to get scheduled runs</ErrorMessage>
        ) : schedule.length === 0 ? (
          <ErrorMessage>No runs scheduled yet. Stay tuned!</ErrorMessage>
        ) : (
          <ScheduleList scrollToDate={scrollToDate} schedule={schedule} />
        )}
      </Content>
    </div>
  );
}

export default SchedulePage;
