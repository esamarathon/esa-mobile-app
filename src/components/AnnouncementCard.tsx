import React from 'react';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import {ChevronRight} from '../assets/Icons';

const Card = styled('div')(
  ({ theme }) => `
  background: #f8f8f8;
  color: ${theme.palette.primary.main};

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 0;
  margin-bottom: 4px;
`);

const CardHeader = styled('header')`
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CardContent = styled('div')`
  padding-top: 0;
  padding-bottom: 13px;
`;

const Title = styled('h2')(
  ({ theme }) => `
  color: ${theme.palette.secondary.main};
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
`);

const Date = styled('p')(
  ({ theme }) => `
  position: absolute;
  top: 4px;
  right: 0;
  padding: 2px 8px;
  color: #fff;
  font-weight: bold;
  background: ${theme.palette.secondary.main};
  font-size: 12px;
`);

const Paragraph = styled('p')`
  font-size: 12px !important;
  margin: 0;
`;

const Chevron = styled(ChevronRight)`
  float: right;
  color: #979797;
`;

interface IProps {
  title: string;
  date: string;
  paragraph: string;
}

function AnnouncementCard({title, date, paragraph}: IProps) {
  const dateString = dayjs(date).format('MMM D. YYYY').toUpperCase();

  return (
    <Card>
      <CardHeader>
        <Title>{title}</Title>
        <Date>{dateString}</Date>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <div>
              <Paragraph>{paragraph}</Paragraph>
            </div>
            <div>
              <Chevron />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnnouncementCard;
