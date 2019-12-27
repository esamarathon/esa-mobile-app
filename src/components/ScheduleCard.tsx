import React, {useState} from 'react';
import styled from 'styled-components';
import {IRun} from '../services/ScheduleService';
import {SetBookmark} from '../services/BookmarkService';
import {HeartIcon} from '../assets/Icons';
import dayjs from 'dayjs';

const Card = styled.li`
  position: relative;
  margin-right: 4px;
  list-style-type: none;
  min-width: 135px;
  background: var(--ion-color-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 9px 18px;
  margin-bottom: 12px;
  overflow: hidden;
`;

// const Header = styled.div`
//   background: var(--ion-color-primary);
//   color: var(--ion-color-secondary);
//   padding: 5px 0;
//   font-weight: 600;
//   font-size: 12px;
//   text-align: center;
// `;

const Content = styled.div`
  font-size: 14px;
`;

const Game = styled.p`
  width: 130px;
  font-size: 16px;
  font-family: 'Titillium Web', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: #444444;
  margin: 0;
`;

const Runner = styled.div`
  color: #979797;
  margin: 0;
`;

const Date = styled.div`
  display: inline-block;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background-color: ${(props) => props.theme.secondaryColor};
  padding: 4px 7px;
  border-radius: 3px;
`;

const HeartButton = styled.button`
  position: absolute;
  right: 12px;
  top: 8px;
  padding: 0;
  background: none;
  border: none;
  color: #000;
  outline: none;
`;

const HeartSymbol = styled(HeartIcon)`
  color: transparent;
  stroke: #979797;
`;

const HeartSymbolLiked = styled(HeartIcon)`
  color: #ffbd17;
  stroke: none;
`;

interface IProps {
  run: IRun;
}

function ScheduleCard({run}: IProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const date = dayjs(run.scheduled)
    .format('H:mm A')
    .toUpperCase();
  async function bookmarkMe(bookmark: any) {
    SetBookmark(bookmark).then(() => setBookmarked(!bookmarked));
  }

  const text = (run.players.join(' vs. ') || '').slice(0, 15);

  return (
    <Card>
      {/* @TODO Fix this time to this format */}
      <Date>{date}</Date>
      <Content>
        <Game>{run.game}</Game>
        <Runner>{text}</Runner>
        <HeartButton onClick={() => bookmarkMe(run)}>
          {bookmarked ? <HeartSymbolLiked /> : <HeartSymbol />}
        </HeartButton>
      </Content>
    </Card>
  );
}

export default ScheduleCard;
