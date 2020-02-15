import React from 'react';
import styled from 'styled-components';
import {IonToolbar, IonTitle, IonButtons, IonMenuButton} from '@ionic/react';
import {MenuIcon} from '../assets/Icons';

const ToolbarWrapper = styled.div<{opaque?: boolean}>`
  background: ${(props) => (props.opaque ? 'transparent' : props.theme.primaryGradient)};
  box-shadow: ${(props) => (props.opaque ? '0' : '0 1px 15px rgba(136, 26, 232, 0.4)')};
`;

const StyledToolbar = styled(IonToolbar)`
  --background: transparent;
  --color: rgba(255, 255, 255, 0.9);
  --border-width: 0 !important;

  margin: 0;

  .button {
    color: var(--icon-color-contrast);
    margin-left: 10px;
  }
`;

const MenuTitle = styled(IonTitle)`
  font-family: 'Titillium Web', sans-serif;
  line-height: 37px;
  font-size: 24px;
`;

interface IProps {
  opaque?: boolean;
  children?: React.ReactNode;
}

function Toolbar({children, opaque}: IProps) {
  return (
    <ToolbarWrapper opaque={opaque}>
      <StyledToolbar>
        <IonButtons slot="start">
          <IonMenuButton>
            <MenuIcon />
          </IonMenuButton>
        </IonButtons>
        <MenuTitle>{children}</MenuTitle>
      </StyledToolbar>
    </ToolbarWrapper>
  );
}

export default Toolbar;
