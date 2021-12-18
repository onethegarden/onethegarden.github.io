import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import queryString, { ParsedQuery } from 'query-string';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import Layout from '../components/layout_fix';
import PostItem from '../components/Main/PostItem';
import Navigation from '../components/Main/Navigation';

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
      <>
        <Navigation pathname={location.pathname} />
        <PostUl>
          {filteredPost.map((edge: Edge) => (
            <PostItem key={edge.node.id} post={edge.node} />
          ))}
        </PostUl>
      </>
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

export interface Result {
  data: Data;
}

export interface Data {
  allMarkdownRemark: {
    edges: Edge[];
  };
}

export interface Edge {
  node: Node;
}
export interface Node {
  html: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  parent: {
    modifiedTime: string;
  };
  id: string;
  frontmatter: {
    layout: string;
    title: string;
    categories: string[];
    thumbnail: {
      childImageSharp: {
        fluid: FluidObject | FluidObject[];
      };
    };
  };
}

export default IndexPage;
