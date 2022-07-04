import { styled } from '@mui/material/styles';


export const StyledHeaderWrapper = styled('div')(
  ({ theme }) => `
  background: ${theme.palette.background.default};
  min-height: 75px;
  position: relative;
  overflow: visible;
  width: 100%;
  padding: 0;
`);

export const StyledHeader = styled('header')(
  ({ theme }) => `
    z-index: 10;
    position: absolute;
    width: 100%;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #fff;
    overflow: hidden;
    height: 100%;
  
    padding: 0 12px;
  
    &:after {
      content: none;
    }  
`);

export const StyledHeaderSmall = styled('header')(
  ({ theme }) => `
    z-index: 10;
    position: absolute;
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    overflow: hidden;
    height: 100%;
  
    padding: 0 12px;
  
    &:after {
      content: none;
    }
`);

export const StyledHeaderFull = styled('header')(
  ({ theme }) => `
    z-index: 10;
    min-height: 75px;
    width: 100%;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #fff;
    overflow: hidden;
    height: 100%;
    
    padding: 0 12px;
  
    &:after {
      content: none;
    }
    
    .expanded {
      display: none;
    }
`);
