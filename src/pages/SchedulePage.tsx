import React from 'react';
import {IonContent, IonPage, IonSpinner} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import {List} from 'react-virtualized';
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

const ScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
  padding: 0 20px 0;
  overflow-x: scroll;
`;

const DayTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  padding-top: 60px;
`;

interface IProps {
  event: IEvent;
}

function SchedulePage({event}: IProps & RouteComponentProps) {
  const {data, isValidating} = useSWR(['schedulePage:schedule', event.meta.horaro], LoadSchedule);

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: any) {
    if (data) {
      if (data[index]['title']) {
        return (
          <React.Fragment key={data[index]['title']}>
            <DayTitle id={data[index]['title']}>
              {dayjs(data[index]['title']).format('dddd D/M')}
            </DayTitle>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={data[index]['scheduled']}>
          <ScheduleCard key={data[index]['scheduled'] + data[index]['players']} run={data[index]} />
        </React.Fragment>
      );
    }
    return <div key={key} style={style}></div>;
  }

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
      <Content>
        {!data && isValidating ? (
          <IonSpinner />
        ) : (
          <ScheduleList>
            <List
              width={window.innerWidth - 40}
              height={window.innerHeight - 140}
              rowCount={data ? data.length : 0}
              rowHeight={20}
              rowRenderer={rowRenderer}
            />
            {/* {(data ? data : []).map((event: any) => {
              if(event["title"]) {
                return(
                  <React.Fragment key={event.title}>
                    <DayTitle id={event.title}>{dayjs(event.title).format('dddd D/M')}</DayTitle>
                  </React.Fragment>
                )
              }
              return (
                <React.Fragment key={event.scheduled}>
                  <ScheduleCard key={event.scheduled + (event.players.join('-') || '')} run={event} />
                </React.Fragment>  
              )
            })} */}
          </ScheduleList>
        )}
      </Content>
    </IonPage>
  );
}

export default SchedulePage;
