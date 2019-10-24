import React, {useState} from 'react';
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
import {NotificationIcon, ChevronRight, MenuIcon} from '../assets/Icons';
import HeaderMeta from '../components/HeaderMeta';
import HomeCard from '../components/HomeCard';
import {FlexContainer} from '../theme/common';

// @TODO Remove this when the schedule list is sorted
import './Home.css';

interface HeaderProps {
  expanded: boolean;
}

const Title = styled.h2`
  font-size: 14px;
  margin: 9px 0 2px;
  color: #979797;
  text-transform: uppercase;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  color: rgba(136, 26, 232, 0.5);
  text-decoration: none;
  font-size: 14px;
  svg {
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
  margin-right: 10px;
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
  animation-name: ${(props) => (props.expanded ? reverseHeight : forwardHeight)};
`;

function HomePage() {
  const [isHeaderOpen, setHeaderOpen] = useState(false);

  function expandHeader() {
    setHeaderOpen((open) => !open);
  }

  return (
    <IonPage>
      <StyledHeader expanded>
        <StyledToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <MenuIcon />
            </IonMenuButton>
          </IonButtons>
          <IonTitle>ESA Summer Marathon</IonTitle>
          <IonButtons slot="end">
            <StyledIcon />
          </IonButtons>
        </StyledToolbar>
        <HeaderMeta isExpanded={isHeaderOpen} />
        <StyledExpander onClick={expandHeader} />
      </StyledHeader>

      <IonContent>
        <FlexContainer margin={true} className="ion-align-items-center ion-justify-content-between">
          <div>
            <Title>Announcements</Title>
          </div>
          <FlexContainer margin={false} className="ion-align-self-stretch ion-align-items-center">
            <Link href="/announcements">
              More <ChevronRight />
            </Link>
          </FlexContainer>
        </FlexContainer>
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

        <FlexContainer margin={true} className="ion-align-items-center ion-justify-content-between">
          <div>
            <Title>Scheduled Events</Title>
          </div>
          <div className="home-flex ion-align-self-stretch ion-align-items-center">
            <Link href="/schedule">
              More <ChevronRight />
            </Link>
          </div>
        </FlexContainer>

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
