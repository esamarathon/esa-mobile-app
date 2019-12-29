import styled from 'styled-components';
import {IonHeader} from '@ionic/react';

export const StyledHeaderWrapper = styled.div`
  min-height: 75px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
`;

export const StyledHeader = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
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

export const StyledHeaderFull = styled(IonHeader)`
  z-index: 10;
  position: absolute;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.primaryGradient};
  box-shadow: 0 1px 15px rgba(136, 26, 232, 0.4);
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
