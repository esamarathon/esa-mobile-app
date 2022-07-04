import React from 'react';
import { styled } from '@mui/material/styles';

interface IProps {
  title: string;
  content: string;
  link?: boolean;
}

const StyledRow = styled('div')`
  flex-direction: column;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled('p')`
  margin: 0;
  margin-top: 10px;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
`;

export const Meta = styled('p')<{link?: boolean}>`
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-transform: ${(p) => (p.link ? 'none' : 'capitalize')};
  margin: 5px 0 10px !important;
`;

function HeaderMetaRow({title, content, link}: IProps) {
  return (
    <StyledRow className="home-margin">
      <Title>{title}</Title>
      <Meta link={link}>{content}</Meta>
    </StyledRow>
  );
}

export default HeaderMetaRow;
