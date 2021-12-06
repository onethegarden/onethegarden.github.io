import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }
  html{
    font: 100%/1.625 -apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
  }
  body{
    word-wrap: break-word;
    font-kerning: normal;
  }
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button{
    padding: 0;
    cursor: pointer;
    outline: none;
    border: 0 none;
    background-color: transparent;
  }
  input{
    outline: none;
  }

`;

export default GlobalStyle;
