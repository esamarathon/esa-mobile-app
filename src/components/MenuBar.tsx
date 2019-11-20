import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonToolbar,
  IonMenuToggle,
} from '@ionic/react';
import React, {useContext} from 'react';
import {home} from 'ionicons/icons';
import {EventContext} from '../App';
import styled from 'styled-components';
import winterLogo from '../assets/winter-logo.png';
import {ScheduleIcon, LocationIcon, HeartIcon} from '../assets/Icons';

const StyledHeaderWrapper = styled.div`
  height: 200px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
  border-top-right-radius: 30px;
`;

const StyledMenu = styled(IonMenu)`
  --background: none;
`;

const StyledHeader = styled(IonHeader)`
  z-index: 1000;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(120.83deg, #c670d0 -22.04%, #881ae8 100%), #eeeeee;
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
  border-top-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;
  overflow: hidden;
  will-change: height;

  &:after {
    content: none;
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

const InnerToolbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const StyledImage = styled.img`
  width: 99px;
  height: 80px;
  margin-bottom: 10px;
`;

const StyledTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  white-space: nowrap;
  font-family: 'Titillium Web', sans-serif;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
`;

const StyledParagraph = styled.p`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  margin: 0;
  line-height: 16px;
  font-family: 'Open Sans', sans-serif;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledDateLocation = styled(StyledParagraph)`
  text-transform: uppercase;
  font-family: 'Titillium Web', sans-serif;
`;

const StyledSchedule = styled(ScheduleIcon)`
  color: #000;
`;

const StyledBookmark = styled(HeartIcon)``;

function MenuBar() {
  const {event, updatePreferredEvent} = useContext(EventContext);

  return (
    <StyledMenu contentId="main" type="overlay">
      <StyledHeaderWrapper>
        <StyledHeader>
          <StyledToolbar>
            <InnerToolbar>
              <StyledImage src={winterLogo} alt="ESA Logo" />
              <StyledTitle>{event.name}</StyledTitle>
              <StyledParagraph>
                {event.meta.cause.name ? event.meta.cause.name : 'No Cause have been selected yet'}
              </StyledParagraph>
              <StyledDateLocation>
                <LocationIcon /> {event.meta.venue.city}, {event.meta.venue.country} | 15-22 Sep
              </StyledDateLocation>
            </InnerToolbar>
          </StyledToolbar>
        </StyledHeader>
      </StyledHeaderWrapper>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/home" routerDirection="none">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Announcements</IonLabel>
            </IonItem>
            <IonItem routerLink="/home" routerDirection="none">
              <StyledSchedule />
              <IonLabel>Schedule</IonLabel>
            </IonItem>
            <IonItem routerLink="/home" routerDirection="none">
              <StyledBookmark />
              <IonLabel>My Bookmarks</IonLabel>
            </IonItem>
            <IonItem routerLink="/home" routerDirection="none">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Account</IonLabel>
            </IonItem>

            <div className="divider">this is a divider for now</div>

            <IonItem routerLink="/home" routerDirection="none">
              <IonLabel>About</IonLabel>
            </IonItem>

            <IonItem routerLink="/home" routerDirection="none">
              <IonLabel>Settings Etc</IonLabel>
            </IonItem>

            <IonItem onClick={() => updatePreferredEvent(undefined)} button routerDirection="none">
              <IonLabel>Event Picker</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </StyledMenu>
  );
}

export default MenuBar;
