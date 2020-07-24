import React, {useState, useEffect} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import styled from 'styled-components';
import {StyledHeaderWrapper, StyledHeaderSmall} from '../components/common/HeaderBar';
import Toolbar from '../components/Toolbar';
import ScheduleCard from '../components/ScheduleCard';
import {GetBookmarks, IBookmark} from '../services/BookmarkService';

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

function BookmarkPage({location}: RouteComponentProps) {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

  useEffect(() => {
    setBookmarks(GetBookmarks());
  }, [location.pathname]);

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeaderSmall>
          <Toolbar opaque>My Bookmarks</Toolbar>
        </StyledHeaderSmall>
      </StyledHeaderWrapper>
      <Content>
        <ScheduleList>
          {bookmarks.map(({run}) => (
            <ScheduleCard key={run.scheduled + (run.players.join('-') || '')} run={run} />
          ))}
        </ScheduleList>
      </Content>
    </IonPage>
  );
}

export default BookmarkPage;
