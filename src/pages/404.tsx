import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import LayoutTemplate from '../components/layout_fix';

const ToMain = styled(Link)`
  font-size: 1.2rem;
  padding: 1.5rem;
  border-radius: 0.3rem;
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.color.gray1};
  color: ${({ theme }) => theme.color.gray5};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
const ErrorMessage = styled.div`
  margin-bottom: 2rem;
`;
const Inform = styled.div`
  padding: 40px;
  width: 100%;
  background-color: white;
  border-radius: 25px;
  text-align: center;
  box-sizing: border-box;
  margin: 50px auto 0;
  position: relative;
  z-index: 100;
`;
const ErrorCode = styled.h1`
  font-size: 100px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.blue4};
`;

function PageNotFound() {
  return (
    <LayoutTemplate pageTitle="404: Not Found">
      <div>
        <Inform>
          <ErrorCode>404</ErrorCode>
          <ErrorMessage>
            <p>요청하신 페이지를 찾을 수 없습니다</p>
            <p>입력하신 주소가 정확한지 다시 한번 확인해 주세요.</p>
          </ErrorMessage>
          <ToMain to="/">main페이지로</ToMain>
        </Inform>
      </div>
    </LayoutTemplate>
  );
}

export default PageNotFound;
