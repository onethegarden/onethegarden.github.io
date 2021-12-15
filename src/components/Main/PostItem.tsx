import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

type PostItemProps = {
  post: {
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
      title: string;
      categories: string[];
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject | FluidObject[];
        };
      };
    };
  };
};

const PostItemBlock = styled.article`
  background-color: ${({ theme }) => theme.color.white};
  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
  p {
    font-size: 0.8rem;
  }
  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }
  margin: 1rem;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;
const Contents = styled.div`
  padding: 1.4rem 1rem;
`;
const Summary = styled.p`
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.color.gray8};
  line-height: 1.66;
`;
const Date = styled.p`
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.color.gray4};
`;

function PostItem({ post }: PostItemProps) {
  const { slug } = post.fields;
  const { title } = post.frontmatter;
  const { modifiedTime: date } = post.parent;
  return (
    <PostItemBlock>
      <Link to={slug}>
        {post.frontmatter.thumbnail?.childImageSharp && (
          <Img
            fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
            alt="Post Item Image"
          />
        )}
        <Contents>
          <h2>{title}</h2>
          <Summary>{post.excerpt}</Summary>
          <Date>{date || '-'}</Date>
        </Contents>
      </Link>
    </PostItemBlock>
  );
}

export default PostItem;
