import React, {Fragment, useState} from 'react';
import {styled} from '@mui/material/styles';
import {ScheduleIcon, LocationIcon, HeartIcon, UserIcon, MenuIcon} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import {logoMap} from '../theme/constants';
import {longDateRange, shortDateRange} from '../services/DateFormatService';
import {Grid} from '@mui/material';
import HeaderMetaRow from './HeaderMetaRow';
import Logo from '../assets/Logo';
import {Link} from 'react-router-dom';

const StyledHeaderWrapper = styled('div')`
  height: 200px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
  border-top-right-radius: 30px;
`;

interface MenuProps {
  isopen: string;
}

const StyledComp = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'myProp',
})<{myProp?: boolean; color?: string}>(({theme, myProp, color}) => ({
  backgroundColor: myProp ? 'aliceblue' : 'red',
  color,
  padding: theme.spacing(1),
}));

const StyledMenu = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isopen',
})<MenuProps>(({theme, isopen}) => ({
  position: 'fixed',
  left: isopen === '1' ? '0px' : '-50%',
  top: 0,
  zIndex: 100,
  width: '50%',
  maxHeight: '100vh',
  height: '100%',
  background: theme.palette.background.default,

  boxShadow: '0 1px 15px rgba(136, 26, 232, 0.4)',
  borderTopRightRadius: '30px',
  color: '#fff',
  paddingBottom: '32px',
  overflow: 'hidden',
  transition: 'all .3s ease-in-out',
}));

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
  ({theme}) => `
  color: ${theme.palette.common.white};
`,
);

const StyledBookmark = styled(HeartIcon)(
  ({theme}) => `
  color: ${theme.palette.common.white};
`,
);

const StyledUser = styled(UserIcon)(
  ({theme}) => `
  color: ${theme.palette.common.white};
`,
);

const StyledList = styled('div')`
  padding: 0 20px 32px;
  overflow: scroll;
  height: calc(100vh - 180px);
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
  margin-top: 24px;
`;

const StyledLabel = styled(Link)(
  ({theme}) => `
  text-decoration: none;
  padding-left: 12px;
  color: ${theme.palette.common.white};
`,
);

const MenuDivider = styled('div')`
  height: 1px;
  background: #dadada;
  margin: 20px 0;
`;

const StyledIconButton = styled('button')`
  position: absolute;
  z-index: 100;
  color: #fff;
  top: 0px;
  left: 0px;
  background: none;
  border: none;
  padding: 8px;
`;

const StyledBackground = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isopen',
})<MenuProps>(({isopen}) => ({
  opacity: isopen === '1' ? 1 : 0,
  pointerEvents: isopen === '1' ? 'auto' : 'none',
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  zIndex: 100,
  overflow: 'hidden',
}));

const Paragraph = styled('p')`
  font-size: 14px;
  margin: 0 0 0 15px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledLogo = styled(Logo)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
`;

const ShortDate = styled('p')`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

interface IProps {
  event: IEvent;
  onClearEvent: () => void;
  menuState: boolean;
  handleMenuState: (newState: boolean) => void;
}

function MenuBar({event, onClearEvent, menuState, handleMenuState}: IProps) {
  const isOpen = menuState ? '1' : '0';

  return (
    <div>
      <StyledIconButton onClick={() => handleMenuState(!menuState)}>
        <MenuIcon />
      </StyledIconButton>
      <StyledBackground isopen={isOpen} onClick={() => handleMenuState(!menuState)} />
      <StyledMenu isopen={isOpen}>
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
                <StyledLabel to="home">Home</StyledLabel>
              </StyledItem>
              <StyledItem>
                <StyledSchedule />
                <StyledLabel to="schedule">Schedule</StyledLabel>
              </StyledItem>
              <StyledItem>
                <StyledBookmark />
                <StyledLabel to="bookmarks">My Bookmarks</StyledLabel>
              </StyledItem>

              <MenuDivider />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {event.meta.venue.country && (
                    <HeaderMetaRow
                      title="Country"
                      content={`${event.meta.venue.city}, ${event.meta.venue.country}`}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {event.meta.venue.country && (
                    <HeaderMetaRow
                      title="Location"
                      content={`${event.meta.venue.name} in ${event.meta.venue.city}, ${event.meta.venue.country}`}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <HeaderMetaRow
                    title="Date"
                    content={longDateRange(event.startDate, event.endDate)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HeaderMetaRow title="Cause" content={event.meta.cause.name} />
                </Grid>
                <Grid item xs={12}>
                  <HeaderMetaRow
                    title="Stream"
                    content={`twitch.tv/${event.meta.twitchChannel}`}
                    link
                  />
                </Grid>
                {/* <HeaderMetaList>
                <HeaderLinks href="https://esamarathon.com/news/e7a9a8a5-658a-4eea-a2f9-5b178a812be4">
                  Master Post
                </HeaderLinks>
                <HeaderLinks href="https://esamarathon.com/rules">Code of Conduct</HeaderLinks>
                <HeaderLinks href="https://esamarathon.com/news/5ec16dac-492c-4fa3-9ac4-1bcf896aadbb">
                  Attendee Guide
                </HeaderLinks>
              </HeaderMetaList> */}
              </Grid>

              <ExtraItems>
                <button onClick={onClearEvent}>Event Picker</button>
              </ExtraItems>
            </div>
          </StyledList>
        </div>
      </StyledMenu>
    </div>
  );
}

export default MenuBar;
