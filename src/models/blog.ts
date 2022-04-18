import { FluidObject } from 'gatsby-image';

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
  tableOfContents: string;
  frontmatter: {
    path: string;
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
