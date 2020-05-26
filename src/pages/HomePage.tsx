import React from 'react';
import {IonContent, IonPage, IonRow, IonCol, IonGrid, IonSpinner} from '@ionic/react';
import styled from 'styled-components';
import {Link, RouteComponentProps} from 'react-router-dom';
import {animated} from 'react-spring';
import useSWR from 'swr';
import {longDateRange, shortDateRange} from '../services/DateFormatService';
import {LoadHoraro} from '../services/ScheduleService';
import {useHomePageGesture} from '../hooks/useHomePageGesture';
import ScheduleCard from '../components/ScheduleCard';
import HeaderMetaRow from '../components/HeaderMetaRow';
import Logo from '../assets/Logo';
import {ChevronRight, LocationIcon} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import Toolbar from '../components/Toolbar';
import LiveNow from '../components/LiveNow';
import {StyledHeaderFull, StyledHeaderWrapper} from '../components/common/HeaderBar';
import dayjs from 'dayjs';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const Title = styled.h2`
  font-family: 'Titillium Web', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  margin-left: 8px;
  margin-bottom: 4px;
  color: #444444;
  text-transform: capitalize;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #979797;
  text-decoration: none;
  font-size: 14px;
  margin-right: 8px;

  svg {
    color: #979797;
    margin-left: 4px;
  }
`;

const StyledExpander = styled.button`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 6px;
  width: 30px;
  height: 2px;
  background: var(--ion-color-light);
`;

const ScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

const PageHeaderContainer = styled.div`
  display: flex;
  margin: 10px 20px 5px;
`;

const HeaderTitle = styled.h2`
  font-family: Titillium Web, sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  margin: 0 0 0 15px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledLogo = styled(Logo)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
`;

const ShortDate = styled.div`
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 0 5px;
  font-weight: 700;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const SomeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  event: IEvent;
}

function HomePage({event}: IProps & RouteComponentProps) {
  const {data, isValidating} = useSWR(['homePage:schedule', event.meta.horaro], LoadHoraro);
  const {animatedValue, bind, stops} = useHomePageGesture();

  const eventIsOver = dayjs().isAfter(event.endDate);
  const liveNow = data?.data[0];
  const upNext = data?.data.slice(1);

  return (
    <IonPage>
      <StyledHeaderWrapper large>
        <StyledHeaderFull
          as={animated.div}
          style={{
            height: animatedValue.interpolate((x: number) => `${x}px`),
          }}
        >
          <Toolbar opaque />
          <IonGrid {...bind()}>
            <animated.div
              style={{
                opacity: animatedValue.interpolate([stops[0], stops[1] / 2], [1, 0]),
              }}
            >
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  <HeaderTitle>{event.name}</HeaderTitle>
                </IonCol>
                <IonCol size="12" className="ion-align-self-start ion-text-center">
                  <SomeDiv>
                    {event.meta.venue.country ? (
                      <React.Fragment>
                        <LocationIcon />
                        <Paragraph>
                          {event.meta.venue.city}, {event.meta.venue.country} |
                        </Paragraph>
                      </React.Fragment>
                    ) : null}
                    <ShortDate>{shortDateRange(event.startDate, event.endDate)}</ShortDate>
                  </SomeDiv>
                </IonCol>
              </IonRow>
            </animated.div>
            <animated.div
              style={{
                opacity: animatedValue.interpolate(stops, [0, 1]),
                transform: animatedValue.interpolate(
                  (x: number) =>
                    `translate3d(0, ${x <= stops[0] + 30 ? -1000 : x - stops[1] - 60}px, 0)`,
                ),
              }}
            >
              <IonRow>
                <IonCol size="12" className="ion-align-self-start ion-text-center">
                  <StyledLogo size={55} />
                </IonCol>
              </IonRow>
              <HeaderMetaRow title="Date" content={longDateRange(event.startDate, event.endDate)} />
              <HeaderMetaRow title="Cause" content={event.meta.cause.name} />
              {event.meta.venue.country ? (
                <HeaderMetaRow
                  title="Location"
                  content={`${event.meta.venue.name} in ${event.meta.venue.city}, ${event.meta.venue.country}`}
                />
              ) : (
                <React.Fragment />
              )}
              <HeaderMetaRow
                title="Stream"
                content={`twitch.tv/${event.meta.twitchChannel}`}
                link
              />
              {/* <HeaderMetaList>
                <HeaderLinks href="https://esamarathon.com/news/e7a9a8a5-658a-4eea-a2f9-5b178a812be4">
                  Master Post
                </HeaderLinks>
                <HeaderLinks href="https://esamarathon.com/rules">Code of Conduct</HeaderLinks>
                <HeaderLinks href="https://esamarathon.com/news/5ec16dac-492c-4fa3-9ac4-1bcf896aadbb">
                  Attendee Guide
                </HeaderLinks>
              </HeaderMetaList> */}
            </animated.div>
          </IonGrid>
          <StyledExpander />
        </StyledHeaderFull>
      </StyledHeaderWrapper>

      <Content>
        {!data || isValidating ? (
          <IonSpinner />
        ) : eventIsOver ? (
          <ScheduleList>
            <p>Event is over</p>
          </ScheduleList>
        ) : (
          <React.Fragment>
            {liveNow ? (
              <React.Fragment>
                <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
                  <Title>Live Now</Title>
                </PageHeaderContainer>
                <ScheduleList>
                  <LiveNow run={liveNow} />
                </ScheduleList>
              </React.Fragment>
            ) : null}
            {upNext ? (
              <React.Fragment>
                <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
                  <Title>Up Next</Title>
                  <StyledLink to="schedule">
                    Schedule <ChevronRight />
                  </StyledLink>
                </PageHeaderContainer>
                <ScheduleList>
                  {upNext.map((run) => (
                    <ScheduleCard key={run.scheduled + run.players.join('')} run={run} />
                  ))}
                </ScheduleList>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </Content>
    </IonPage>
  );
}

export default HomePage;
