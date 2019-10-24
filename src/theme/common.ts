import styled from 'styled-components';

interface ContainerProps {
  margin: boolean;
}

export const FlexContainer = styled.div<ContainerProps>`
  display: flex;
  ${(props) => (props.margin ? 'margin: 0 20px;' : '')}
`;
