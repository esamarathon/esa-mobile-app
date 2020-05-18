import React from 'react';
import {IonContent, IonPage, IonSpinner} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import Toolbar from '../components/Toolbar';
import {StyledHeader, StyledHeaderWrapper} from '../components/common/HeaderBar';
import styled from 'styled-components';
import useSWR from 'swr';
import {LoadSchedule} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';
import ScheduleCard from '../components/ScheduleCard';
import dayjs from 'dayjs';
import {HashLink} from 'react-router-hash-link';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const DayScroller = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0 0;
`;

const ScrollItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
`;

const ScrollLink = styled(HashLink)`
  text-decoration: none;
  color: #fff;
  font-size: 12px;
`;

const ScrollBorder = styled.span`
    width: 130%;
    border-radius: 3px;
    height: 3px;
    background #fff;
    margin-top: 4px;
`;

const ScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

const DayTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

interface IProps {
  event: IEvent;
}

function SchedulePage({event}: IProps & RouteComponentProps) {
  const {data, isValidating} = useSWR(['schedulePage:schedule', event.meta.horaro], LoadSchedule);

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeader>
          <Toolbar opaque>Schedule</Toolbar>
          <DayScroller>
            {(data ? data.days : []).map((day: string) => {
              return (
                <ScrollItem key={day}>
                  <ScrollLink smooth to={`#${day}`}>
                    {dayjs(day).format('ddd')}
                  </ScrollLink>
                  <ScrollBorder />
                </ScrollItem>
              );
            })}
          </DayScroller>
        </StyledHeader>
      </StyledHeaderWrapper>
      <Content>
        {!data && isValidating ? (
          <IonSpinner />
        ) : (
          <ScheduleList>
            {(data ? data.data : []).map((day: any) => (
              <React.Fragment key={day.title}>
                <p id={day.title} />
                <DayTitle>{dayjs(day.title).format('dddd D/M')}</DayTitle>
                {day.runs.map((run: any) => (
                  <ScheduleCard key={run.scheduled + (run.players.join('-') || '')} run={run} />
                ))}
              </React.Fragment>
            ))}
          </ScheduleList>
        )}
      </Content>
    </IonPage>
  );
}

export default SchedulePage;
