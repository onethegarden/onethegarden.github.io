import React from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import 'gatsby-remark-vscode/styles.css';
import { graphql } from 'gatsby';
import MarkDownStyle from './common/MarkdownStyle';
import { Data } from '../pages/index';

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
      <>
        <Layout pageTitle="post">
          <PostTitle>{frontmatter.title}</PostTitle>
          <MarkDownStyle />
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: html }}></MarkdownBlock>
        </Layout>
      </>
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
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin: 0.2rem 0;
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
    margin: 2rem 0;
    padding: 1rem 1.2rem;
    border-left: 4px solid ${({ theme }) => theme.color.blue4};
    background-color: ${({ theme }) => theme.color.blue1};
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

  img {
    max-width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid black;
  }
`;

export default PostTemplate;
