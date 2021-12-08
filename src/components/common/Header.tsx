import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
// import SearchIcon from '../../images/search.svg';

const HeaderBlock = styled.header`
  top: 0;
  left: 50%;
  width: 100%;
  height: 3rem;
  z-index: 300;
  position: fixed;
  transform: translateX(-50%);
  backdrop-filter: blur(3px);
  background-color: ${({ theme }) => theme.color.gray1};
`;
const HeaderContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 4rem;
`;
const ImageLink = styled(Link)`
  img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 1.2rem;
    margin-top: 0.3rem;
  }
`;
const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const SiteTitle = styled.div`
  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  transition: 0.3s;
`;
type HeaderProps = {
  githubProfile: string;
  title: string;
};

function Header({ githubProfile, title }: HeaderProps) {
  return (
    <HeaderBlock>
      <HeaderContainer>
        <HeaderWrapper>
          <ImageLink to="/about">
            <img src={githubProfile} alt="onethegarden_profile" />
          </ImageLink>
          <SiteTitle>
            <Link to="/">{title}</Link>
          </SiteTitle>
        </HeaderWrapper>
        <HeaderWrapper>
          {/* <button
            onClick={() => {
              console.log('button');
            }}
          >
            <SearchIcon />
          </button> */}
        </HeaderWrapper>
      </HeaderContainer>
    </HeaderBlock>
  );
}

export default Header;
