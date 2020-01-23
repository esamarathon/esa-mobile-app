import React from 'react';
import useSWR from 'swr';
import {IonContent, IonPage, IonSpinner} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import {StyledHeaderWrapper, StyledHeaderSmall} from '../components/common/HeaderBar';
import styled from 'styled-components';
import Toolbar from '../components/Toolbar';
import {GetBookmarks} from '../services/BookmarkService';
import ScheduleCard from '../components/ScheduleCard';

const Content = styled(IonContent)`
  background-color: var(--ion-background);
`;

const ScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

function BookmarkPage(_: RouteComponentProps) {
  const {data, isValidating} = useSWR('bookmarks', GetBookmarks);

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeaderSmall>
          <Toolbar opaque>My Bookmarks</Toolbar>
        </StyledHeaderSmall>
      </StyledHeaderWrapper>
      <Content>
        {!data && isValidating ? (
          <IonSpinner />
        ) : (
          <ScheduleList>
            {(data ? data : []).map((run) => (
              <ScheduleCard key={run.scheduled + (run.players.join('-') || '')} run={run} />
            ))}
          </ScheduleList>
        )}
      </Content>
    </IonPage>
  );
}

export default BookmarkPage;
