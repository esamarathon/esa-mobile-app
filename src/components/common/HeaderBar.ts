import { styled } from '@mui/material/styles';


export const StyledHeaderWrapper = styled('div')<{large?: boolean}>`
  min-height: 75px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
  margin-bottom: ${(props) => (props.large ? '80px' : '0')};
`;

export const StyledHeader = styled('header')(
  ({ theme }) => `
    z-index: 10;
    position: absolute;
    width: 100%;
    background: ${theme.palette.background.default};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #fff;
    padding-bottom: 32px;
    overflow: hidden;
  
    &:after {
      content: none;
    }  
`);

export const StyledHeaderSmall = styled('header')(
  ({ theme }) => `
    z-index: 10;
    position: absolute;
    width: 100%;
    background: ${theme.palette.background.default};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    overflow: hidden;
  
    &:after {
      content: none;
    }
`);

export const StyledHeaderFull = styled('header')(
  ({ theme }) => `
    z-index: 10;
    position: absolute;
    width: 100%;
    background: ${theme.palette.background.default};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #fff;
    padding-bottom: 32px;
    overflow: hidden;
  
    &:after {
      content: none;
    }
`);
