import { createGlobalStyle } from 'styled-components';
import { theme } from '@/app/styles/theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
  }
  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    &:hover {
      color: ${theme.colors.primary};
    }
  }
  button {
    cursor: pointer;
  }
  input, button, select, textarea {
    font-family: inherit;
  }
`;
