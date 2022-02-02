import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../lib/styles/code.css';

import { graphql } from 'gatsby';
import Layout from './Layout';
import { Data } from '../models/blog';
import MarkdownBlock from './MarkdownBlock/MarkdownBlock';
import TableOfContentsBlock from './Post/TableOfContents';
import { countAPI } from '../api/count';

const PostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.35;
  margin-top: 0.75rem;
  border-bottom: 0.8px solid #afafaf;
`;

const PostWrapper = styled.div`
  margin-top: 3rem;
  @media (min-width: 1280px) {
    display: flex;
  }
`;

const PostContents = styled.div`
  @media (min-width: 1280px) {
    flex-grow: 0;
    max-width: 70%;
    flex-basis: 70%;
  }
`;

const ViewContents = styled.div`
  margin-top: 8px;
  width: 100%;
  text-align: right;
  color: ${({ theme }) => theme.color.gray3};
`;

type PostTempalteProps = {
  data: Data;
};

function PostTemplate({ data }: PostTempalteProps) {
  const [count, setCount] = useState('-');
  const {
    node: { html, frontmatter, tableOfContents, fields },
  } = data.allMarkdownRemark.edges[0];
  const url = fields.slug.replace(/\//gi, '');

  useEffect(async () => {
    const selectCount = await (await countAPI.getCount(url)).data[0];
    const result = await countAPI.updateCount({
      id: selectCount.id,
      form: { url, count: selectCount.attributes.count + 1 },
    });
    setCount(String(result.data.attributes.count));
  }, []);

  return (
    <Layout pageTitle="post">
      <PostWrapper>
        <PostContents>
          <PostTitle>{frontmatter.title}</PostTitle>
          <ViewContents>{count} views</ViewContents>
          <MarkdownBlock htmlText={html} />
        </PostContents>
        <TableOfContentsBlock toc={tableOfContents} />
      </PostWrapper>
    </Layout>
  );
}

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
