import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { Data, Node, Edge } from '../models/blog';
import Layout from '../components/Layout';
import PostItem from '../components/Main/PostItem';
import Navigation from '../components/Main/Navigation';

const PostWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
const PostUl = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
`;

type IndexPageProps = {
  location: {
    search: string;
  };
  data: Data;
};

function IndexPage({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const filteredPost = edges.filter(({ node }: { node: Node }) =>
    selectedCategory !== 'All'
      ? node.frontmatter.categories.includes(selectedCategory)
      : true,
  );

  const location = useLocation();
  return (
    <Layout pageTitle="Blog">
      <PostWrapper>
        <Navigation pathname={location.pathname} />
        <PostUl>
          {filteredPost.map((edge: Edge) => (
            <PostItem key={edge.node.id} post={edge.node} />
          ))}
        </PostUl>
      </PostWrapper>
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
          fields {
            slug
          }
          excerpt(pruneLength: 180, truncate: true)
          fields {
            slug
          }
          frontmatter {
            layout
            title
            categories
          }
          parent {
            ... on File {
              modifiedTime(formatString: "MMMM D, YYYY")
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
