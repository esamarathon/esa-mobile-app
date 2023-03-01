import React from 'react';
import {styled} from '@mui/material/styles';
import {MenuIcon} from '../assets/Icons';

const StyledToolbar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'centered',
})<{centered?: boolean}>(({theme, centered}) => ({
  backgroundColor: centered ? 'center' : 'left',
  padding: theme.spacing(1),
}));

// .button {
//   color: ${theme.palette.primary.main};
//   margin-left: 10px;
// }

const MenuTitle = styled('div')`
  line-height: 37px;
  font-size: 24px;
`;

interface IProps {
  children?: React.ReactNode;
  centered?: boolean;
}

function Toolbar({children, centered = false}: IProps) {
  return (
    <StyledToolbar centered>
      <MenuTitle>{children}</MenuTitle>
    </StyledToolbar>
  );
}

export default Toolbar;
