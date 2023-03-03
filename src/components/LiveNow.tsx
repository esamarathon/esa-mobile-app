import React from 'react';
import { styled } from '@mui/material/styles';
import demoImg from '../assets/NowPlayingDemo.png';
import {IRun} from '../services/ScheduleService';
import {formatPlayers} from '../services/PlayersService';

const LiveCard = styled('div')`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 185px;
  padding: 0 20px 16px;
  margin-bottom: 12px;
`;

const Title = styled('h3')`
  position: relative;
  z-index: 2;
  color: #fff;
  font-family: Titillium Web;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  margin: 0;
`;

const Runner = styled('p')`
  position: relative;
  z-index: 2;
  color: #fff;
  font-family: Open Sans;
  font-weight: 500;
  font-size: 16px;
  margin: 0;
`;

const Image = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

interface Props {
  run: IRun;
}

function LiveNow({run}: Props) {
  return (
    <LiveCard>
      <Title>{run.game}</Title>
      <Runner>{formatPlayers(run.players)}</Runner>
      <Image src={demoImg} alt="demo image" />
    </LiveCard>
  );
}

export default LiveNow;
