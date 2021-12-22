import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { Data } from '../models/blog';
import MarkdownBlock from '../components/MarkdownBlock/AboutMarkdownBlock';

const AboutInfo = styled.main`
  width: 100%;
`;

type AboutPageProps = {
  data: Data;
};

const AboutPage = ({ data }: AboutPageProps) => {
  const { edges } = data.allMarkdownRemark;
  const about = edges.map(({ node }) => node)[0];
  return (
    <Layout pageTitle="About Page">
      <AboutInfo>
        <MarkdownBlock htmlText={about.html} />
      </AboutInfo>
    </Layout>
  );
};
export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { layout: { eq: "about" } } }) {
      edges {
        node {
          frontmatter {
            title
            categories
          }
          html
        }
      }
    }
  }
`;
export default AboutPage;
