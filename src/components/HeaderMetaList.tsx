import {IonRow} from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import {Title, Meta} from './HeaderMetaRow';

const StyledRow = styled(IonRow)`
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
