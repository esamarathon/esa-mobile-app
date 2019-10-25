import React from 'react';
import {IonPage} from '@ionic/react';
import styled from 'styled-components';
import Logo from '../assets/Logo';

const Page = styled(IonPage)`
  background: #fff;
`;

const CenteredLogo = styled(Logo)`
  margin: auto;
`;

export function Loading() {
  return (
    <Page>
      <CenteredLogo width="140" height="140" />
    </Page>
  );
}
