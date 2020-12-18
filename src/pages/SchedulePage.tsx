import React from 'react';
import {IonContent, IonPage, IonSpinner} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import Toolbar from '../components/Toolbar';
import {StyledHeader, StyledHeaderWrapper} from '../components/common/HeaderBar';
import styled from 'styled-components';
import useSWR from 'swr';
import {LoadSchedule} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';
import ScheduleList from '../components/ScheduleList';
import {HashLink} from 'react-router-hash-link';
import dayjs from 'dayjs';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const DayScroller = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  justify-content: center;
  list-style-type: none;
  padding: 0 15px 15px 0;
  margin: 0 15px;
`;

const ScrollItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 15px;
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
  background: #fff;
  margin-top: 4px;
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
            {(data ? data : []).map((day: any) => {
              if (day['title']) {
                return (
                  <ScrollLink key={day.title} smooth to={`#${day.title}`}>
                    <ScrollItem>
                      {dayjs(day.title).format('ddd')}
                      <ScrollBorder />
                    </ScrollItem>
                  </ScrollLink>
                );
              }
              return null;
            })}
          </DayScroller>
        </StyledHeader>
      </StyledHeaderWrapper>
      <Content>{!data && isValidating ? <IonSpinner /> : <ScheduleList items={data} />}</Content>
    </IonPage>
  );
}

export default SchedulePage;
