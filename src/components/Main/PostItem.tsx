import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

type PostItemProps = {
  post: {
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
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.4s;
  }
`;
const Contents = styled.div`
  padding: 2rem 1rem;
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
          <p>{date || '-'}</p>
        </Contents>
      </Link>
    </PostItemBlock>
  );
}

export default PostItem;
