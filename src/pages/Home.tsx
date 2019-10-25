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
import HomeCard from '../components/HomeCard';
import {EventContext} from '../App';

// @TODO Remove this when the schedule list is sorted
import './Home.css';

const MenuTitle = styled(IonTitle)`
  font-family: 'Titillium Web', sans-serif;
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
    color: #881ae8;
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
  const {event} = useContext(EventContext);

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

      <IonContent>
        <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
          <Title>Announcements</Title>
          <StyledLink to="/announcements">
            More <ChevronRight />
          </StyledLink>
        </PageHeaderContainer>

        <HomeCard
          title="ESA WINTER 2020 - MASTER POS"
          date="8/2 - 14:30"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />
        <HomeCard
          title="ESA WINTER 2020 - MASTER POS"
          date="8/2 - 14:30"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />
        <HomeCard
          title="ESA WINTER 2020 - MASTER POS"
          date="8/2 - 14:30"
          paragraph="ESA Winter 2020 has moved!. It will be held, just like summer, in the..."
        />

        <PageHeaderContainer className="ion-align-items-center ion-justify-content-between">
          <Title>Scheduled Events</Title>
          <StyledLink to="schedule">
            More <ChevronRight />
          </StyledLink>
        </PageHeaderContainer>

        {/* @TODO This will probably be redesigned anyway, no need to recode */}
        <ul className="schedule-list">
          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>
        </ul>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
