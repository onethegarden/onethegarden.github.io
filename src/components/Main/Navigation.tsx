import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const NavigationBlock = styled.nav`
  border-bottom: solid 1px ${({ theme }) => theme.color.gray2};
  line-height: 30px;
  span {
    color: ${({ theme }) => theme.color.gray4};
  }
`;

const ToggleLink = styled(Link)<{ isActive: boolean }>`
  display: inline-block;
  line-height: 30px;
  letter-spacing: 2pt;
  text-decoration: none;
  color: ${({ theme }) => theme.color.gray4};
  font-size: 12px;
  font-size: 1.2rem;
  padding: 0 10px;
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: solid 2px ${({ theme }) => theme.color.blue4};
      color: ${({ theme }) => theme.color.blue4};
    `}
`;

type NavigationProps = {
  pathname: string;
};

function Navigation({ pathname }: NavigationProps) {
  const menus = [
    { name: 'posts', link: '/' },
    { name: 'categories', link: '/categories' },
  ];
  return (
    <NavigationBlock>
      {menus.map((menu) => (
        <ToggleLink
          key={menu.name}
          to={`${menu.link}`}
          isActive={pathname === menu.link}
        >
          {menu.name}
        </ToggleLink>
      ))}
    </NavigationBlock>
  );
}

export default Navigation;
