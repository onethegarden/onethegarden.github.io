import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import 'gatsby-remark-vscode/styles.css';

import Layout from './layout';
import MarkDownStyle from './common/MarkdownStyle';
import { Data } from '../pages/index';

const PostTitle = styled.h1`
  font-weight: 800;
  font-size: 2.5rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-bottom: 0.8px solid #afafaf;
`;
const MarkdownBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem 0;
  word-break: break-all;
  line-height: 1.8;
  font-size: 16px;
  font-weight: 400;
  p {
    padding: 3px 0;
    margin-bottom: 0.8125rem;
  }

  h1,
  h2,
  h3 {
    font-weight: 800;
  }

  h1 {
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin: 0.2rem 0;
    margin-top: 0.8rem;
  }
  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    line-height: 1.6rem;
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
    margin-left: 20px;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.color.black};
    margin: 100px 0;
  }

  a {
    color: ${({ theme }) => theme.color.blue4};
    text-decoration: underline;
  }
  p {
    margin: 0;
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

type PostTempalteProps = {
  data: Data;
};
const PostTemplate = React.memo(
  ({
    data: {
      allMarkdownRemark: { edges },
    },
  }: PostTempalteProps) => {
    const {
      node: { html, frontmatter },
    } = edges[0];
    return (
      <Layout pageTitle="post">
        <>
          <PostTitle>{frontmatter.title}</PostTitle>
          <MarkDownStyle />
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: html }} />
        </>
      </Layout>
    );
  },
);

PostTemplate.displayName = 'PostTemplate';

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PostTemplate;
