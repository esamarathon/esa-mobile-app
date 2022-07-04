import React from 'react';
import { styled } from '@mui/material/styles';
import {MenuIcon} from '../assets/Icons';

const StyledToolbar = styled('div')`
  color: rgba(255, 255, 255, 0.9);
  margin: 0;

  .button {
    color: var(--icon-color-contrast);
    margin-left: 10px;
  }
`;

const MenuTitle = styled('div')`
  line-height: 37px;
  font-size: 24px;
`;

interface IProps {
  children?: React.ReactNode;
}

function Toolbar({children}: IProps) {
  return (
    <StyledToolbar>
      <MenuIcon />
      <MenuTitle>{children}</MenuTitle>
    </StyledToolbar>
  );
}

export default Toolbar;
