import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const CategoryListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  padding: 0.8rem 1rem;
`;

const Category = styled.li`
  display: inline-block;
  height: 26px;
  margin: 4px 4px 0 0;
  padding: 0 10px;
  font-size: 13px;
  line-height: 27px;
  background-color: ${({ theme }) => theme.color.purple1};
  vertical-align: top;

  a {
    color: ${({ theme }) => theme.color.gray3};
    text-decoration: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.purple2};
    transition-duration: 0.5s;
    color: ${({ theme }) => theme.color.purple5};
  }
`;

export type CategoryListProps = {
  categoryList: {
    [key: string]: number;
  };
};

function CategoryList({ categoryList }: CategoryListProps) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <Category key={name}>
          <Link to={`/?category=${name}`}>
            {name}({count})
          </Link>
        </Category>
      ))}
    </CategoryListWrapper>
  );
}

export default CategoryList;
