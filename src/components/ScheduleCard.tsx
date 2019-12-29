import React from 'react';
import styled from 'styled-components';
import {IRun} from '../services/ScheduleService';

const Card = styled.li`
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

interface IProps {
  run: IRun;
}

function ScheduleCard({run}: IProps) {
  // const date = dayjs(run.scheduled)
  //   .format('H:mm, MMM D')
  //   .toUpperCase();
  const text = (run.players.join(' vs. ') || '').slice(0, 15);

  return (
    <Card>
      {/*<Date>{date}</Date>*/}
      <Date>14:00 PM</Date>
      <Content>
        <Game>{run.game}</Game>
        <Runner>{text}</Runner>
      </Content>
    </Card>
  );
}

export default ScheduleCard;
