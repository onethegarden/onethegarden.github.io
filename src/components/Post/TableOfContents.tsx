import React from 'react';
import styled from 'styled-components';

interface TableOfContentsProps {
  toc: string;
}

const TableOfContentsBlock = styled.div`
  top: 5rem;
  position: sticky;
  align-self: flex-start;
  flex: 1;
  flex-direction: column;
  word-break: break-all;
  padding: 1.2rem;
  margin-left: 1rem;
  li {
    color: ${({ theme }) => theme.color.gray4};
    font-size: 0.9rem;
    word-break: break-all;
    list-style: none;
    font-weight: 400;
    line-height: 1.4;
    margin: 0.4rem 0;
    ul {
      margin: 0rem 0 1rem 1rem;
      border-left: 1px solid #eeeeee;
      a {
        display: block;
        font-size: 0.8rem;
        margin-left: 0.4rem;
        border-radius: 0.4rem;
        text-decoration: none;
      }
    }
  }
  @media (min-width: 0px) {
    display: none;
  }
  @media (min-width: 1280px) {
    display: block;
  }
`;

function TableOfContents({ toc }: TableOfContentsProps) {
  return <TableOfContentsBlock dangerouslySetInnerHTML={{ __html: toc }} />;
}
export default TableOfContents;
