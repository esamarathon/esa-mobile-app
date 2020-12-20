import React, {useState} from 'react';
import styled from 'styled-components';
import {IRun} from '../services/ScheduleService';
import {HeartIcon} from '../assets/Icons';
import dayjs from 'dayjs';
import {formatPlayers} from '../services/PlayersService';
import EstimateParser from './common/EstimateParser';

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
  font-size: 16px;
  font-family: 'Titillium Web', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

const Expanded = styled.div``;

const Expander = styled.div`
  border-top: 1px solid #dadada;
  margin: 6px 0;
`;

const InnerExpander = styled.div`
  display: flex;
  p {
    margin: 0 8px 0 0;
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: #979797;
  }
`;

interface IProps {
  run: IRun;
  bookmarked: boolean;
  onBookmark: (run: IRun) => void;
}

function ScheduleCard({run, bookmarked, onBookmark}: IProps) {
  const [expanded, setExpanded] = useState(false);
  const date = dayjs(run.scheduled).format('H:mm A').toUpperCase();

  async function expandToggle(state: boolean) {
    setExpanded((state = !expanded));
  }

  return (
    <Card onClick={() => expandToggle(expanded)}>
      <Date>{date}</Date>
      <Content>
        <Game>{run.game}</Game>
        <Runner>{formatPlayers(run.players)}</Runner>
        {run.id ? (
          <HeartButton onClick={() => onBookmark(run)}>
            {bookmarked ? <HeartSymbolLiked /> : <HeartSymbol />}
          </HeartButton>
        ) : null}
        {expanded ? (
          <Expanded>
            <Expander />
            <InnerExpander>
              <p>
                <EstimateParser seconds={run.length} />
              </p>
              <p>{run.category}</p>
            </InnerExpander>
          </Expanded>
        ) : null}
      </Content>
    </Card>
  );
}

export default ScheduleCard;
