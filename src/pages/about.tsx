import * as React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const AboutInfo = styled.main`
    width: 100%;
    margin: 80px 0;
`;

const AboutTitle = styled.h1`
    border-left: 3px solid red;
    padding-left: 20px;
`;

const AboutContents = styled.article`
    margin: 100px 20px;
`;

const AboutPage: React.FC = () => {
    return (
        <Layout pageTitle="About Page">
            <AboutInfo>
                <AboutTitle>한정원</AboutTitle>
                <AboutContents>
                    <p>🙋‍♀️한정원 블로그 입니다</p>
                </AboutContents>
            </AboutInfo>
        </Layout>
    );
};
export default AboutPage;
