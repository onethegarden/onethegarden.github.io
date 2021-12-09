import { createGlobalStyle } from 'styled-components';

const MarkDownStyle = createGlobalStyle`

pre {
  margin: 1rem -2.5rem;
}
:not(pre) > code {
  font-size: 0.8rem;
  padding: 0.11rem 0.3rem;
  margin: 0 0.1rem;
  border-radius: 0.2rem;
  white-space: normal;
  background: #effafd;
  color: #424242;
  border: 1.2px solid #a3e4f8;
}
code,
pre {
  tab-size: 2;
  font-size: 0.8rem;
}
`;

export default MarkDownStyle;
