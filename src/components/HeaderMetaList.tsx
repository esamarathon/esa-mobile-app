import React from 'react';
import {styled} from '@mui/material/styles';
import {Title, Meta} from './HeaderMetaRow';

const StyledRow = styled('div')`
  flex-direction: column;
  margin-bottom: 4px;
`;

export const HeaderLinks = styled(Meta.withComponent('a'))`
  color: var(--ion-color-secondary);
  text-decoration: none;
  margin-bottom: 0 !important;
`;

interface IProps {
  children: React.ReactNode;
}

function HeaderMetaList({children}: IProps) {
  return (
    <StyledRow className="home-margin">
      <Title>Info</Title>
      {children}
    </StyledRow>
  );
}

export default HeaderMetaList;
