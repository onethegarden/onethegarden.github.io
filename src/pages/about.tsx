import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout_fix';
import { Data } from './index';
import MarkdownBlock from '../components/MarkdownBlock/MarkdownBlock';

const AboutInfo = styled.main`
  width: 100%;
  margin: 80px 0;
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
