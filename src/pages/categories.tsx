import React, { useMemo } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import CategoryList from '../components/Main/CategoryList';
import { useCategory } from '../hooks/useCategory';
import { Data } from './index';
import Layout from '../components/layout';

interface categoryProps {
  data: Data;
}

function category({
  data: {
    allMarkdownRemark: { edges },
  },
}: categoryProps) {
  const categoryList = useMemo(() => useCategory(edges), []);
  return (
    <Layout pageTitle="Blog">
      <CategoryList categoryList={categoryList} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: fields___slug, order: DESC }) {
      edges {
        node {
          frontmatter {
            categories
          }
        }
      }
    }
  }
`;

export default category;
