import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import Layout from '../components/layout';
import { FluidObject } from 'gatsby-image';
import queryString, { ParsedQuery } from 'query-string';
import PostItem from '../components/Main/PostItem';
import Navigation from '../components/Main/Navigation';

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
  const selectedCategory: string = typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category;
  const filteredPost = edges.filter(
    ({
      node: {
        frontmatter: { categories },
      },
    }: {
      node: { frontmatter: { categories: string[] } };
    }) => (selectedCategory !== 'All' ? categories.includes(selectedCategory) : true),
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
    allMarkdownRemark(sort: { fields: fields___slug, order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            categories
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 768, maxHeight: 200, fit: INSIDE, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
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
  fields: {
    slug: string;
  };
  parent: {
    modifiedTime: string;
  };
  id: string;
  frontmatter: {
    title: string;
    categories: string[];
    thumbnail: {
      childImageSharp: {
        fluid: FluidObject | FluidObject[];
      };
    };
  };
}
const PostUl = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  grid-template-columns: repeat(1, 1fr);
`;

export default IndexPage;
