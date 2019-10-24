import {IonRow} from '@ionic/react';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  title: string;
  content: string;
}

const StyledRow = styled(IonRow)`
  flex-direction: column;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  font-family: 'Titillium Web', sans-serif;
`;

export const Meta = styled.p`
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-transform: capitalize;
  margin: 5px 0 10px !important;
`;

function HeaderMetaRow({title, content}: IProps) {
  return (
    <StyledRow className="home-margin">
      <Title>{title}</Title>
      <Meta>{content}</Meta>
    </StyledRow>
  );
}

export default HeaderMetaRow;
