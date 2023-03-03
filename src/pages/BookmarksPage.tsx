import React, {useContext} from 'react';
import { styled } from '@mui/material/styles';
import {StyledHeaderWrapper, StyledHeaderSmall} from '../components/common/HeaderBar';
import Toolbar from '../components/Toolbar';
import ScheduleCard from '../components/ScheduleCard';
import {BookmarkContext, IBookmarkContext} from '../App';

const Content = styled('div')`
  background-color: var(--ion-background);
`;

const ScheduleList = styled('ul')`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 20px 15px;
  overflow-x: scroll;
`;

function BookmarkPage() {
  const {bookmarks, onBookmark} = useContext(BookmarkContext) as IBookmarkContext;

  return (
    <div>
      <StyledHeaderWrapper>
        <StyledHeaderSmall>
          <Toolbar>My Bookmarks</Toolbar>
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
    </div>
  );
}

export default BookmarkPage;
