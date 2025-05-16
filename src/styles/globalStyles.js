// src/styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
  }
  
  @media (max-width: 600px) {
    html {
      font-size: 14px;
    }
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
