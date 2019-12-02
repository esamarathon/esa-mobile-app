import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonToolbar,
  IonMenuToggle,
} from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import {ScheduleIcon, LocationIcon, HeartIcon, UserIcon} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import {logoMap} from '../theme/constants';

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
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
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
  color: ${(props) => props.theme.accentColor};
`;

const StyledBookmark = styled(HeartIcon)`
  color: ${(props) => props.theme.accentColor};
`;

const StyledUser = styled(UserIcon)`
  color: ${(props) => props.theme.accentColor};
`;

const StyledList = styled(IonList)`
  padding: 0 20px;
`;

const StyledItem = styled(IonItem)`
  --color: #757575;
  --border-width: 0;
  --border-color: transparent;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --detail-icon-opacity: 0;
  font-size: 12px;
`;

const ExtraItems = styled(IonItem)`
  --color: #757575;
  --border-width: 0;
  --border-color: transparent;
  --detail-icon-opacity: 0;
  font-size: 14px;
  font-weight: 600;
  font-family: Titillium Web, sans-serif;
`;

const StyledLabel = styled(IonLabel)`
  padding-left: 30px;
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #dadada;
  margin: 20px 0;
`;

interface IProps {
  event: IEvent;
  onClearEvent: () => void;
}

function MenuBar({event, onClearEvent}: IProps) {
  return (
    <StyledMenu contentId="main" type="overlay">
      <StyledHeaderWrapper>
        <StyledHeader>
          <StyledToolbar>
            <InnerToolbar>
              <StyledImage src={logoMap[event.meta.theme]} alt="ESA Logo" />
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
        <StyledList>
          <IonMenuToggle autoHide={false}>
            <StyledItem routerLink="/home" routerDirection="none">
              {/*@TODO This should probably be some sort of Announcement icon in the future*/}
              <StyledSchedule />
              <StyledLabel>Announcements</StyledLabel>
            </StyledItem>
            <StyledItem routerLink="/schedule" routerDirection="none">
              <StyledSchedule />
              <StyledLabel>Schedule</StyledLabel>
            </StyledItem>
            <StyledItem routerLink="/bookmarks" routerDirection="none">
              <StyledBookmark />
              <StyledLabel>My Bookmarks</StyledLabel>
            </StyledItem>
            <StyledItem routerLink="/account" routerDirection="none">
              <StyledUser />
              <StyledLabel>Account</StyledLabel>
            </StyledItem>

            <MenuDivider />

            <ExtraItems routerLink="/about" routerDirection="none">
              <IonLabel>About</IonLabel>
            </ExtraItems>

            <ExtraItems routerLink="/settings" routerDirection="none">
              <IonLabel>Settings Etc</IonLabel>
            </ExtraItems>

            <ExtraItems onClick={onClearEvent} button routerDirection="none">
              <IonLabel>Event Picker</IonLabel>
            </ExtraItems>
          </IonMenuToggle>
        </StyledList>
      </IonContent>
    </StyledMenu>
  );
}

export default MenuBar;
