import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';
import { Data, Node, Edge } from '../models/blog';
import Layout from '../components/Layout';
import PostItem from '../components/Main/PostItem';

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

  return (
    <Layout pageTitle="Blog">
      <PostUl>
        {filteredPost.map((edge: Edge) => (
          <PostItem key={edge.node.id} post={edge.node} />
        ))}
      </PostUl>
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
