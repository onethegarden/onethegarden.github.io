/* eslint-disable @typescript-eslint/naming-convention */
import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import CategoryList from '../components/Main/CategoryList';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout';
import { Data } from './index';

type categoryProps = {
  data: Data;
};

function category({ data }: categoryProps) {
  const { edges } = data.allMarkdownRemark;
  const categoryList = useMemo(() => useCategory(edges), []);
  return (
    <Layout pageTitle="Blog">
      <CategoryList categoryList={categoryList} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { ne: "about" } } }
      sort: { fields: fields___slug, order: DESC }
    ) {
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
