import styled from 'styled-components';
import {IonHeader} from '@ionic/react';

export const StyledHeaderWrapper = styled.div<{large?: boolean}>`
  min-height: 75px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
  margin-bottom: ${(props) => (props.large ? '80px' : '0')};
`;

export const StyledHeader = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;
  overflow: hidden;
  will-change: height;

  &:after {
    content: none;
  }
`;

export const StyledHeaderSmall = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #fff;
  overflow: hidden;

  &:after {
    content: none;
  }
  ion-toolbar {
    padding: 8px 0;
  }
`;

export const StyledHeaderFull = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #fff;
  padding-bottom: 32px;
  overflow: hidden;
  will-change: height;

  &:after {
    content: none;
  }
`;
