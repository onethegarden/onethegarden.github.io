import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import '../lib/styles/code.css';

import Layout from './Layout';
import { Data } from '../pages/index';
import MarkdownBlock from './MarkdownBlock/MarkdownBlock';

const PostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.35;
  margin-top: 0.75rem;
  border-bottom: 0.8px solid #afafaf;
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
          <MarkdownBlock htmlText={html} />
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
