import React, {useContext, useState} from 'react';
import {
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import styled, {keyframes} from 'styled-components';
import {Link} from 'react-router-dom';
import {NotificationIcon, ChevronRight, MenuIcon} from '../assets/Icons';
import HeaderMeta from '../components/HeaderMeta';
import AnnouncementCard from '../components/AnnouncementCard';
import ScheduleCard from '../components/ScheduleCard';
import {EventContext} from '../App';

const MenuTitle = styled(IonTitle)`
  font-family: 'Titillium Web', sans-serif;
`;

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
  color: rgba(136, 26, 232, 0.5);
  text-decoration: none;
  font-size: 14px;

  svg {
    color: var(--ion-color-primary);
    margin-left: 4px;
  }
`;

const StyledToolbar = styled(IonToolbar)`
  --background: transparent;
  --color: rgba(255, 255, 255, 0.9);
  --border-width: 0 !important;

  margin: 0;

  .button {
    color: var(--icon-color-contrast);
    margin-left: 10px;
  }
`;

const StyledIcon = styled(NotificationIcon)`
  margin-right: 15px;
  color: var(--ion-color-secondary);
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

const reverseHeight = keyframes`
  0% {
    height: 100vh;
  }

  1% {
    height: 700px;
  }

  100% {
    height: 150px;
  }
`;

const forwardHeight = keyframes`
  99% {
    height: 700px;
  }

  100% {
    height: 100vh;
  }
`;

interface HeaderProps {
  expanded: boolean;
}

const StyledHeader = styled(IonHeader)<HeaderProps>`
  position: relative;
  height: 150px;
  background: linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #eeeeee;
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;

  &:after {
    content: none;
  }

  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-name: ${(props) => (props.expanded ? forwardHeight : reverseHeight)};
`;

function HomePage() {
  const [isHeaderOpen, setHeaderOpen] = useState(false);
  const {event, runs} = useContext(EventContext);

  function expandHeader() {
    setHeaderOpen((open) => !open);
  }

  return (
    <IonPage>
      <StyledHeader expanded={isHeaderOpen}>
        <StyledToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <MenuIcon />
            </IonMenuButton>
          </IonButtons>
          <MenuTitle>{event.name}</MenuTitle>
          <IonButtons slot="end">
            <StyledIcon />
          </IonButtons>
        </StyledToolbar>
        <HeaderMeta event={event} isExpanded={isHeaderOpen} />
        <StyledExpander onClick={expandHeader} />
      </StyledHeader>

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

        <ScheduleList>
          {runs.map((run) => (
            <ScheduleCard key={run.scheduled_t + (run['Player(s)'] || '')} run={run} />
          ))}
        </ScheduleList>
      </Content>
    </IonPage>
  );
}

export default HomePage;
