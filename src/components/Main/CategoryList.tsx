import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export type CategoryListProps = {
  categoryList: {
    [key: string]: number;
  };
};

const CategoryList: FunctionComponent<CategoryListProps> = function ({ categoryList }) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <Category>
          <Link to={`/?category=${name}`}>
            {name}({count})
          </Link>
        </Category>
      ))}
    </CategoryListWrapper>
  );
};

const CategoryListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  padding: 0.8rem 1rem;
`;

const Category = styled.li`
  margin: 0.3rem;
  margin-right: 2rem;
  padding: 0.5rem 0;
  font-size: 18px;
  font-weight: 400;
  margin-right: 1rem;
  border-radius: 0.3rem;
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.color.gray1};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  a {
    color: ${({ theme }) => theme.color.gray3};
    text-decoration: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.gray2};
    transition-duration: 0.5s;
  }
`;

export default CategoryList;
