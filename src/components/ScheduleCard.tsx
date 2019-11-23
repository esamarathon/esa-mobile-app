import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {IRun} from '../services/ScheduleService';

const Card = styled.li`
  margin-right: 4px;
  list-style-type: none;
  min-width: 135px;
  background: var(--ion-color-light);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  background: var(--ion-color-primary);
  color: var(--ion-color-secondary);
  padding: 5px 0;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;

const Content = styled.div`
  padding: 6px 16px;
  font-size: 14px;
`;

const Game = styled.p`
  width: 130px;
  font-family: 'Titillium Web', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: var(--ion-color-primary);
  margin: 0;
`;

const Runner = styled.div`
  color: #979797;
  margin: 0;
`;

interface IProps {
  run: IRun;
}

function ScheduleCard({run}: IProps) {
  const date = dayjs(run.scheduled)
    .format('H:mm, MMM D')
    .toUpperCase();
  const text = (run.players.join(' vs. ') || '').slice(0, 15) + '...';

  return (
    <Card>
      <Header>{date}</Header>
      <Content>
        <Game>{run.game}</Game>
        <Runner>{text}</Runner>
      </Content>
    </Card>
  );
}

export default ScheduleCard;
