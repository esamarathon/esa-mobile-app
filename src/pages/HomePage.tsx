import React, {Fragment, useContext, useEffect} from 'react';
import {BackButtonEvent} from '@ionic/core';
import {styled} from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import {animated} from 'react-spring';
import useSWR from 'swr';
import {longDateRange, shortDateRange} from '../services/DateFormatService';
import {IUpcomingResponse, loadFromHoraro} from '../services/ScheduleService';
import ScheduleCard from '../components/ScheduleCard';
import HeaderMetaRow from '../components/HeaderMetaRow';
import Logo from '../assets/Logo';
import {ChevronRight, LocationIcon} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import Toolbar from '../components/Toolbar';
import LiveNow from '../components/LiveNow';
import {
  StyledHeaderFull,
  StyledHeaderSmall,
  StyledHeaderWrapper,
} from '../components/common/HeaderBar';
import dayjs from 'dayjs';
import {App} from '@capacitor/app';

import {BookmarkContext, IBookmarkContext} from '../App';
import {Grid} from '@mui/material';
import {useHomePageGesture} from '../hooks/useHomePageGesture';

const Content = styled('div')``;

const Title = styled('h2')`
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

const StyledExpander = styled('button')`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 6px;
  width: 30px;
  height: 2px;
  background: var(--ion-color-light);
`;

const ScheduleList = styled('ul')`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

const PageHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px 5px;
`;

const HeaderTitle = styled('h2')`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  margin: 0;
`;

interface IProps {
  event: IEvent;
}

function HomePage({event}: IProps) {
  const {bookmarks, onBookmark} = useContext(BookmarkContext) as IBookmarkContext;
  const {data, error, isValidating} = useSWR(
    event.meta.horaro ? `upcoming/${encodeURIComponent(event.meta.horaro)}` : null,
    (path: string) => loadFromHoraro<IUpcomingResponse>(path),
  );
  const {animatedValue, bind, stops} = useHomePageGesture();
  const location = useLocation();

  const eventIsOver = dayjs().isAfter(event.endDate);
  const liveNow = data?.data?.[0];
  const upNext = data?.data?.slice(1);

  useEffect(() => {
    function onBackButton(event: BackButtonEvent) {
      event.detail.register(-1, () => {
        const path = location.pathname;
        if (path === '/home') {
          App.exitApp();
        }
      });
    }

    document.addEventListener('ionBackButton', onBackButton as EventListener);

    return () => {
      document.removeEventListener('ionBackButton', onBackButton as EventListener);
    };
  });

  return (
    <Fragment>
      <StyledHeaderWrapper>
        <StyledHeaderSmall>
          <Toolbar />
          <Grid item xs={12}>
            <HeaderTitle>{event.name}</HeaderTitle>
          </Grid>
        </StyledHeaderSmall>
      </StyledHeaderWrapper>

      <Content>
        {isValidating ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>Validating</p>
          </div>
        ) : error ? (
          <ScheduleList>
            <p>Could not fetch scheduled runs</p>
          </ScheduleList>
        ) : !data ? (
          <ScheduleList>
            <p>No runs scheduled yet. Stay tuned!</p>
          </ScheduleList>
        ) : (
          <React.Fragment>
            {liveNow ? (
              <React.Fragment>
                <PageHeaderContainer>
                  <Title>Live Now</Title>
                </PageHeaderContainer>
                <ScheduleList>
                  <LiveNow run={liveNow} />
                </ScheduleList>
              </React.Fragment>
            ) : null}
            {upNext ? (
              <React.Fragment>
                <PageHeaderContainer>
                  <Title>Up Next</Title>
                  <StyledLink to="/schedule">
                    Schedule <ChevronRight />
                  </StyledLink>
                </PageHeaderContainer>
                <ScheduleList>
                  {upNext.map((run) => (
                    <ScheduleCard
                      key={run.scheduled + run.players.join('')}
                      run={run}
                      bookmarked={!!run.id && bookmarks.has(run.id)}
                      onBookmark={() => onBookmark(run)}
                    />
                  ))}
                </ScheduleList>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </Content>
    </Fragment>
  );
}

export default HomePage;
