import {IonRow} from '@ionic/react';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: any[];
}

const StyledRow = styled(IonRow)`
  flex-direction: column;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 21px;
`;

export const HeaderLinks = styled.a`
  color: var(--ion-color-secondary);
  text-decoration: none;
`;

function HeaderMetaList({children}: IProps) {
  return (
    <StyledRow className="home-margin">
      <Title>Info</Title>
      {children}
    </StyledRow>
  );
}

export default HeaderMetaList;
