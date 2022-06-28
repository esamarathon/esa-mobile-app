import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo';

const Page = styled.div`
  background: #fff;
`;

const CenteredLogo = styled(Logo)`
  margin: auto;
`;

function LoadingPage() {
  return (
    <Page>
      <CenteredLogo size={130} />
    </Page>
  );
}

export default LoadingPage;
