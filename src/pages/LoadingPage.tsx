import React from 'react';
import {styled} from '@mui/material/styles';
import Logo from '../assets/Logo';

const Page = styled('div')`
  background: #fff;
`;

const CenteredLogo = styled(Logo)`
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
`;

function LoadingPage() {
  return (
    <Page>
      <CenteredLogo size={130} />
      <p>Loading...?</p>
    </Page>
  );
}

export default LoadingPage;
