import React, {useContext} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import styled from 'styled-components';
import {StyledHeaderWrapper, StyledHeaderSmall} from '../components/common/HeaderBar';
import Toolbar from '../components/Toolbar';
import ScheduleCard from '../components/ScheduleCard';
import {BookmarkContext, IBookmarkContext} from '../App';

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
  const {bookmarks, onBookmark} = useContext(BookmarkContext) as IBookmarkContext;

  return (
    <IonPage>
      <StyledHeaderWrapper>
        <StyledHeaderSmall>
          <Toolbar opaque>My Bookmarks</Toolbar>
        </StyledHeaderSmall>
      </StyledHeaderWrapper>
      <Content>
        <ScheduleList>
          {bookmarks.size === 0 ? (
            <p>You don't have any bookmarks yet. Go to the schedule and mark some!</p>
          ) : (
            Array.from(bookmarks.values()).map(({run}) => (
              <ScheduleCard
                key={run.scheduled + (run.players.join('-') || '')}
                run={run}
                bookmarked
                onBookmark={() => onBookmark(run)}
              />
            ))
          )}
        </ScheduleList>
      </Content>
    </IonPage>
  );
}

export default BookmarkPage;
