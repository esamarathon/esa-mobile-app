import React, {Fragment, useContext, useEffect} from 'react';
import {App, BackButtonListener} from '@capacitor/app';
import {styled} from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {IRun, IUpcomingResponse, loadFromHoraro} from '../services/ScheduleService';
import ScheduleCard from '../components/ScheduleCard';
import {ChevronRight} from '../assets/Icons';
import {IEvent} from '../services/EventService';
import Toolbar from '../components/Toolbar';
import LiveNow from '../components/LiveNow';
import {StyledHeaderSmall, StyledHeaderWrapper} from '../components/common/HeaderBar';
import dayjs from 'dayjs';

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
  const encodedUrl = encodeURIComponent(event.meta.horaro);
  const {bookmarks, onBookmark} = useContext(BookmarkContext) as IBookmarkContext;
  const {data, error, status} = useQuery({
    queryKey: [`upcoming/${encodedUrl}`, `upcoming/${encodedUrl}`],
    queryFn: () => loadFromHoraro<IUpcomingResponse>(`upcoming/${encodedUrl}`)
  });

  const {animatedValue, bind, stops} = useHomePageGesture();
  const location = useLocation();

  useEffect(() => {
    function onBackButton(event: any) {
      event.detail.register(-1, () => {
        const path = location.pathname;
        if (path === '/home') {
          App.exitApp();
        }
      });
    }

    App.addListener('backButton', onBackButton as BackButtonListener);

    return () => {
      App.addListener('backButton', onBackButton as BackButtonListener);
    };
  });

  if (status === 'pending') {
    return (
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
    );
  }

  if (error) {
    return (
      <ScheduleList>
        <p>Could not fetch scheduled runs</p>
      </ScheduleList>
    );
  }

  if (!data) {
    return (
      <ScheduleList>
        <p>No runs scheduled yet. Stay tuned!</p>
      </ScheduleList>
    );
  }

  const eventIsOver = dayjs().isAfter(event.endDate);
  const liveNow = data?.data?.[0];
  const upNext = data?.data?.slice(1);

  if (eventIsOver) {
    return <p>The event is over Sadge</p>;
  }

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
                {upNext.map((run: IRun) => (
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
      </Content>
    </Fragment>
  );
}

export default HomePage;
