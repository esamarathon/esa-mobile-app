import React from 'react';
import {IonContent, IonPage, IonSpinner} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import Toolbar from '../components/Toolbar';
import {StyledHeader, StyledHeaderWrapper} from '../components/common/HeaderBar';
import styled from 'styled-components';
import useSWR from 'swr';
import {LoadHoraro} from '../services/ScheduleService';
import {IEvent} from '../services/EventService';
import ScheduleCard from '../components/ScheduleCard';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const DayScroller = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ScrollItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
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
  margin: 60px 0 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

interface IProps {
  event: IEvent;
}

function SchedulePage({event}: IProps & RouteComponentProps) {
  const {data, isValidating} = useSWR(event.meta.horaro, LoadHoraro);

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeader>
          <Toolbar opaque>Schedule</Toolbar>
          <DayScroller>
            <ScrollItem>
              <span>Mon</span>
              <ScrollBorder />
            </ScrollItem>
          </DayScroller>
        </StyledHeader>
      </StyledHeaderWrapper>
      <Content>
        {!data && isValidating ? (
          <IonSpinner />
        ) : (
          <ScheduleList>
            {(data ? data.data : []).map((run) => (
              <ScheduleCard key={run.scheduled + (run.players.join('-') || '')} run={run} />
            ))}
          </ScheduleList>
        )}
      </Content>
    </IonPage>
  );
}

export default SchedulePage;
