import React from 'react';
import styled from 'styled-components';
import MarkdownBlock from './MarkdownBlock';

type MarkdownBlockProps = {
  htmlText: string;
  /** styled-components className 상속받을 때 사용 */
  className?: string;
};

const Markdown = styled(MarkdownBlock)`
  padding-top: 3rem;
  color: ${({ theme }) => theme.color.gray6};
  h1,
  h2,
  h3 {
    margin: 2rem 0 0.5rem 0;
    font-weight: 600;
  }
  h1 {
    margin-top: 10px;
  }
  p {
    margin: 0 0 0.2rem 0;
  }

  hr {
    border: 0.5px solid ${({ theme }) => theme.color.gray2};
    margin: 3rem 0;
  }
  ol,
  ul {
    margin: 0.4rem 0;
    margin-left: 2rem;
  }
`;

function AboutMarkdown({ htmlText, className }: MarkdownBlockProps) {
  return <Markdown htmlText={htmlText} className={className} />;
}

AboutMarkdown.defaultProps = {
  className: '',
};

export default AboutMarkdown;
