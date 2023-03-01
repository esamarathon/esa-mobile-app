import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {IRun, IParsedGame} from '../services/ScheduleService';
import {HeartIcon} from '../assets/Icons';
import dayjs from 'dayjs';
import {formatPlayers} from '../services/PlayersService';
import EstimateParser from './common/EstimateParser';

const Card = styled('li')`
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

const Content = styled('div')`
  font-size: 14px;
`;

const Game = styled('p')`
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 600;
  color: #444444;
  margin: 0;
`;

const Runner = styled('div')`
  color: #979797;
  margin: 0;
`;

const Date = styled('div')(
  ({theme}) => `
  display: inline-block;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background-color: ${theme.palette.secondary.main};
  padding: 4px 7px;
  border-radius: 3px;
`,
);

const HeartButton = styled('button')`
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

const HeartSymbolLiked = styled(HeartIcon)(
  ({theme}) => `
  color: ${theme.palette.primary.main};
  stroke: none;
`,
);

const Expanded = styled('div')``;

const Expander = styled('div')`
  border-top: 1px solid #dadada;
  margin: 6px 0;
`;

const InnerExpander = styled('div')`
  display: flex;
  p {
    margin: 0 8px 0 0;
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

function parseGame(game: string): IParsedGame | undefined {
  const regex = /\[(.*?)\]\((.*?)\)/gm;
  const regexResult = [...game.matchAll(regex)];

  if (regexResult.length > 0) {
    const result = regexResult[0];

    return {
      name: result[1],
      highlightUrl: result[2],
    };
  }
}

function ScheduleCard({run, bookmarked, onBookmark}: IProps) {
  const [expanded, setExpanded] = useState(false);
  const date = dayjs(run.scheduled).format('H:mm A').toUpperCase();

  run.parsedGame = parseGame(run.game as string);

  function expandToggle() {
    setExpanded(!expanded);
  }

  console.log(run.parsedGame);

  return (
    <Card>
      <Date>{date}</Date>
      <Content onClick={expandToggle}>
        {run.parsedGame ? <Game>{run.parsedGame.name}</Game> : <Game>{run.game}</Game>}
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
              <p>
                <a href={run.parsedGame?.highlightUrl}>Twitch Highlight</a>
              </p>
            </InnerExpander>
          </Expanded>
        ) : null}
      </Content>
    </Card>
  );
}

export default ScheduleCard;
