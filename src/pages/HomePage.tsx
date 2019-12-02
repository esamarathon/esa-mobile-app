import React from 'react';
import {IonContent, IonHeader, IonPage, IonRow, IonCol, IonGrid, IonSpinner} from '@ionic/react';
import styled from 'styled-components';
import {Link, RouteComponentProps} from 'react-router-dom';
import {animated} from 'react-spring';
import useSWR from 'swr';
import {longDateRange, shortDateRange} from '../services/DateFormatService';
import {LoadHoraro} from '../services/ScheduleService';
import {useHomePageGesture} from '../hooks/useHomePageGesture';
import AnnouncementCard from '../components/AnnouncementCard';
import ScheduleCard from '../components/ScheduleCard';
import HeaderMetaRow from '../components/HeaderMetaRow';
import HeaderMetaList, {HeaderLinks} from '../components/HeaderMetaList';
import Logo from '../assets/Logo';
import {ChevronRight} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import Toolbar from '../components/Toolbar';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const Title = styled.h2`
  font-family: 'Titillium Web', sans-serif;
  font-size: 14px;
  margin: 0;
  color: #979797;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.secondaryColor};
  text-decoration: none;
  font-size: 14px;

  svg {
    color: ${(props) => props.theme.secondaryColor};
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
  margin: 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

const PageHeaderContainer = styled.div`
  display: flex;
  margin: 10px 20px 5px;
`;

const StyledHeaderWrapper = styled.div`
  height: 150px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
`;

const StyledHeader = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;
  overflow: hidden;
  will-change: height;

  &:after {
    content: none;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: var(--ion-color-secondary);
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  margin: 0;
`;

const StyledLogo = styled(Logo)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
`;

const ShortDate = styled.div`
  background-color: #fff;
  color: ${(props) => props.theme.shadowColor};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 3px 5px;
  font-weight: bold;
  position: absolute;
  right: 0;
  bottom: 30px;
`;

interface IProps {
  event: IEvent;
}

function HomePage({event}: IProps & RouteComponentProps) {
  const {data, isValidating} = useSWR(event.meta.horaro, LoadHoraro);
  const {animatedValue, bind, stops} = useHomePageGesture();

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeader
          as={animated.div}
          style={{
            height: animatedValue.interpolate((x: number) => `${x}px`),
          }}
        >
          <Toolbar opaque>{event.name}</Toolbar>
          <IonGrid {...bind()}>
            <animated.div
              style={{
                opacity: animatedValue.interpolate([stops[0], stops[1] / 2], [1, 0]),
              }}
            >
              <IonRow>
                <IonCol size="3" className="ion-align-self-start ion-text-center">
                  <StyledLogo size={55} />
                </IonCol>
                <IonCol size="9">
                  <HeaderTitle>{event.meta.cause.name}</HeaderTitle>
                  <Paragraph>{event.meta.venue.name}</Paragraph>
                  <Paragraph>
                    {event.meta.venue.city}, {event.meta.venue.country}
                  </Paragraph>
                </IonCol>
                <ShortDate>{shortDateRange(event.startDate, event.endDate)}</ShortDate>
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
              <HeaderMetaRow
                title="Location"
                content={`${event.meta.venue.name} in ${event.meta.venue.city}, ${event.meta.venue.country}`}
              />
              <HeaderMetaRow
                title="Stream"
                content={`twitch.tv/${event.meta.twitchChannel}`}
                link
              />
              <HeaderMetaList>
                <HeaderLinks href="https://google.com">Master Post</HeaderLinks>
                <HeaderLinks href="https://google.com">Code of Conduct</HeaderLinks>
                <HeaderLinks href="https://google.com">Attendee Guide</HeaderLinks>
              </HeaderMetaList>
            </animated.div>
          </IonGrid>
          <StyledExpander />
        </StyledHeader>
      </StyledHeaderWrapper>

      <Content>
        <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
          <Title>Announcements</Title>
          <StyledLink to="/announcements">
            More <ChevronRight />
          </StyledLink>
        </PageHeaderContainer>

        <AnnouncementCard
          title="ESA WINTER 2020 - MASTER POS"
          date="2019-10-25T12:00:00.000Z"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />
        <AnnouncementCard
          title="ESA WINTER 2020 - MASTER POS"
          date="2019-08-21T12:00:00.000Z"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />
        <AnnouncementCard
          title="ESA WINTER 2020 - MASTER POS"
          date="2018-05-04T12:00:00.000Z"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />

        <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
          <Title>Scheduled Events</Title>
          <StyledLink to="schedule">
            More <ChevronRight />
          </StyledLink>
        </PageHeaderContainer>

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

export default HomePage;
