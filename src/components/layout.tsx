import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import GlobalStyle from '../components/common/GlobalStyle';
import Header from '../components/common/Header';
import theme from '../lib/styles/theme';
import Favicon from '../images/favicon.ico';

type LayoutType = {
  pageTitle: string;
  children: React.ReactElement;
};

function Layout({ pageTitle, children }: LayoutType) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          author
          description
        }
      }
    }
  `);
  const { title, siteUrl, author, description } = data.site.siteMetadata;
  const githubProfile = 'https://avatars1.githubusercontent.com/u/51187540?s=460&v=4';
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Helmet>
          <title>
            {pageTitle} | {title}
          </title>
          <link rel="shortcut icon" href={Favicon} />
          <link rel="icon" href={Favicon} />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={githubProfile} />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:site_name" content={title} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={githubProfile} />
          <meta name="twitter:site" content={author} />
          <meta name="twitter:creator" content={author} />
        </Helmet>
        <GlobalStyle />
        <Header githubProfile={githubProfile} title={title} />
        <Contents>{children}</Contents>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.main`
  padding: 2rem;
  padding: 1.2rem;
  margin: auto;
  margin-top: 3rem;
  max-width: 800px;
`;

const Contents = styled.section`
  padding: 1rem;
`;

export default Layout;
