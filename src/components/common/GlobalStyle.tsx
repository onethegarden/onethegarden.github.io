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
   font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  }
  body{
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings:"kern", "liga", "clig", "calt";
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
