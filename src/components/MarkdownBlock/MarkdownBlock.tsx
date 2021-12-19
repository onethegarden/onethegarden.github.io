import React from 'react';
import styled from 'styled-components';

type MarkdownBlockProps = {
  htmlText: string;
  /** styled-components className 상속받을 때 사용 */
  className?: string;
};

const Markdown = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem 0;
  word-break: break-all;
  line-height: 1.8;
  font-size: 16px;
  font-weight: 400;
  h1,
  h2,
  h3 {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.35;
    margin-top: 0.75rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.5;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.6;
  }
  p {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    line-height: 1.6rem;
    margin: 0.4rem 0;
  }

  blockquote {
    margin: 1rem 0;
    padding: 1rem 1.2rem;
    border-left: 5px solid ${({ theme }) => theme.color.gray5};
    background-color: ${({ theme }) => theme.color.gray2};
    pre {
      margin: 1rem 0;
    }
  }

  ol,
  ul {
    margin: 1rem 0;
    margin-left: 2rem;
  }
  hr {
    border: 1px solid ${({ theme }) => theme.color.black};
    margin: 100px 0;
  }

  a {
    color: ${({ theme }) => theme.color.gray4};
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
  table {
    margin: 0.5rem 0;
  }
  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.color.gray3};
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
  }
  th {
    background-color: ${({ theme }) => theme.color.gray2};
  }
`;

function MarkdownBlock({ htmlText, className }: MarkdownBlockProps) {
  return (
    <Markdown
      dangerouslySetInnerHTML={{ __html: htmlText }}
      className={className}
    />
  );
}

MarkdownBlock.defaultProps = {
  className: '',
};

export default MarkdownBlock;
