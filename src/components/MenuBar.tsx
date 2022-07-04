import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {ScheduleIcon, LocationIcon, HeartIcon, UserIcon} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import {logoMap} from '../theme/constants';
import {shortDateRange} from '../services/DateFormatService';

const StyledHeaderWrapper = styled('div')`
  height: 200px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
  border-top-right-radius: 30px;
`;

interface MenuProps {
  isOpen: string;
}

const StyledMenu = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'isOpen'
})<MenuProps>(
  ({ theme }) => `
  position: fixed;
  left: ${(props: MenuProps) => (props.isOpen ? '0' : '-100%')};
  top: 0;
  z-index: 100;
  width: 50%;
  max-height: 100vh;
  height: 100%;
  background: ${theme.palette.background.default};
  
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
  border-top-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;
  overflow: hidden;

  &:after {
    content: none;
  }
`);

const StyledHeader = styled('div')`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const StyledToolbar = styled('div')`
  background: transparent;
  color: rgba(255, 255, 255, 0.9);

  margin: 0;

  .button {
    color: var(--icon-color-contrast);
    margin-left: 10px;
  }
`;

const InnerToolbar = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const StyledImage = styled('img')`
  width: 99px;
  height: 80px;
  margin-bottom: 10px;
`;

const StyledTitle = styled('h3')`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  white-space: nowrap;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
`;

const StyledParagraph = styled('p')`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  margin: 0;
  line-height: 16px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledDateLocation = styled(StyledParagraph)`
  text-transform: uppercase;
`;

const StyledSchedule = styled(ScheduleIcon)(
  ({ theme }) => `
  color: ${theme.palette.info.main};
`);

const StyledBookmark = styled(HeartIcon)(
  ({ theme }) => `
  color: ${theme.palette.info.main};
`);

const StyledUser = styled(UserIcon)(
  ({ theme }) => `
  color: ${theme.palette.info.main};
`);

const StyledList = styled('div')`
  padding: 0 20px;
`;

const StyledItem = styled('div')`
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 12px;
  display: flex;
`;

const ExtraItems = styled('div')`
  font-size: 14px;
  font-weight: 600;
`;

const StyledLabel = styled('div')`
  padding-left: 30px;
`;

const MenuDivider = styled('div')`
  height: 1px;
  background: #dadada;
  margin: 20px 0;
`;

interface IProps {
  event: IEvent;
  onClearEvent: () => void;
}

function MenuBar({event, onClearEvent}: IProps) {
  const [state, setState] = useState<boolean>(false);

  return (
    <StyledMenu isOpen={state ? '1' : '0'}>
      <StyledHeaderWrapper>
        <StyledHeader>
          <StyledToolbar>
            <InnerToolbar>
              <StyledImage src={logoMap[event.meta.theme]} alt="ESA Logo" />
              <StyledTitle>{event.name}</StyledTitle>
              {event.meta.cause.name ? (
                <StyledParagraph>{event.meta.cause.name}</StyledParagraph>
              ) : null}
              <StyledDateLocation>
                {event.meta.venue.country ? (
                  <React.Fragment>
                    <LocationIcon />
                    {event.meta.venue.city || 'yes'}, {event.meta.venue.country || 'Oakland'} |{' '}
                  </React.Fragment>
                ) : null}
                {shortDateRange(event.startDate, event.endDate)}
              </StyledDateLocation>
            </InnerToolbar>
          </StyledToolbar>
        </StyledHeader>
      </StyledHeaderWrapper>
      <div>
        <StyledList>
          <div>
            <StyledItem>
              {/*@TODO This should probably be some sort of Announcement icon in the future*/}
              <StyledUser />
              <StyledLabel>Home</StyledLabel>
            </StyledItem>
            <StyledItem>
              <StyledSchedule />
              <StyledLabel>Schedule</StyledLabel>
            </StyledItem>
            <StyledItem>
              <StyledBookmark />
              <StyledLabel>My Bookmarks</StyledLabel>
            </StyledItem>
            {/*<StyledItem routerLink="/account" routerDirection="none">*/}
            {/*  <StyledUser />*/}
            {/*  <StyledLabel>Account</StyledLabel>*/}
            {/*</StyledItem>*/}

            <MenuDivider />

            {/*<ExtraItems routerLink="/about" routerDirection="none">*/}
            {/*  <IonLabel>About</IonLabel>*/}
            {/*</ExtraItems>*/}

            {/*<ExtraItems routerLink="/settings" routerDirection="none">*/}
            {/*  <IonLabel>Settings Etc</IonLabel>*/}
            {/*</ExtraItems>*/}

            <ExtraItems onClick={onClearEvent}>
              <button>Event Picker</button>
            </ExtraItems>
          </div>
        </StyledList>
      </div>
    </StyledMenu>
  );
}

export default MenuBar;
