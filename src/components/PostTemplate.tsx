import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import '../lib/styles/code.css';

import Layout from './Layout';
import { Data } from '../models/blog';
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
function PostTemplate({ data }: PostTempalteProps) {
  const {
    node: { html, frontmatter, tableOfContents },
  } = data.allMarkdownRemark.edges[0];
  return (
    <Layout pageTitle="post">
      <>
        <PostTitle>{frontmatter.title}</PostTitle>
        <MarkdownBlock htmlText={tableOfContents} />
        <MarkdownBlock htmlText={html} />
      </>
    </Layout>
  );
}
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
          tableOfContents
        }
      }
    }
  }
`;

export default PostTemplate;
