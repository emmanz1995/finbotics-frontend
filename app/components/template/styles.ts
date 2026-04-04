import styled from 'styled-components';
import { ThemeProps } from '../../styles/themes';

export const StyledLayout = styled.main`
  width: 100%;
  //.layout-header {
  //  display: flex;
  //}
`;

export const Main = styled.main<ThemeProps>`
  //margin-left: 16rem;
  //padding: ${props => props.theme?.space?.md};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 0;
`;
