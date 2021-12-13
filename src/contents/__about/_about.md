---
layout: about
title: about
categories: ["about"]
---

# 프론트엔드 개발자 한정원 입니다.

- 제가 작성한 코드를 통해 조금 더 나은 세상을 만들기를 원합니다.
- 유지보수가 용이한 코드를 작성하고 그 코드를 짜기 위해 고민하는 것을 좋아합니다.
- 반복적인 업무를 단순화 시키는 것을 좋아하고 그로 인해 팀원들이 행복해 하는 모습에 보람을 느낍니다.
 <br/>

- 긍정적인 피드백을 통해 팀원들과 함께 성장할 수 있는 조직을 선호합니다.
- 저의 노력과 기여가 회사가 추구하는 가치에 도움이 되는 개발을 하고 싶습니다.

---
## Work experience

### Front End Engineer, 오토위니

2021.04 - 2021.11

### 옥션위니 레거시 프론트엔드 마이그레이션

jsp 로 되어있던 레거시 프로젝트를 React, Typescript로 마이그레이션 하였습니다.

이슈 분배 및 프로젝트 일정관리 또한 함께 진행하였고, 2022년 실서버 반영 예정입니다.

### 프론트엔드 기술환경 구성 및 기본 기능 구현

- React기반 컴포넌트 계층 구조를 디자인 하였습니다.
- React-query로 Client state와 Server state를 분리하였습니다.
- UI로직과 데이터처리 로직을 분리하도록 하였습니다.
- 공통으로 쓰이는 컴포넌트들을 추상화 시켜 공통 컴포넌트로 분리하였습니다. (LayoutTemplate, Modal, Paging, Loading, ErrorPage 등)

### 코딩컨벤션 정리

- 팀 내 코딩 컨벤션을 정리하였습니다.
    1. 기본적으로 Airbnb의 코딩컨벤션을 따릅니다.
    2. 저장 시 prettier로 세팅해둔 자동 포멧팅을 사용합니다.
    3. 줄임말은 지양합니다.
    4. 컴포넌트 작성은 component 디렉토리 하위에 도메인 기준으로 폴더를 만들어서 사용합니다. (type, component, styled css 순으로 작성합니다.)
    5. UI로직과 데이터 처리 로직을 분리합니다. 데이터 로직은 custom hook으로 만들어 hook 폴더에 별도로 분리합니다.

### 메인페이지 최적화

- 웹 최적화 (웹 점수 : 23점 → 81점) (초기 로딩 속도 개선, SEO, code split, lazy-loading)
    1. 초기 로딩 속도 개선 : 기존의 메인페이지에는 바이어 리뷰 8개를 iframe으로 youtube를 불러오고 있었습니다. iframe을 사용하지 않는 방향이 가장 좋겠지만, 기존 레이아웃을 유지해야 했기 때문에 재생버튼을 css 로 만들어 버튼 클릭 시 iframe을 불러오도록 하였습니다. 추가적으로 lazy-loading을 적용하여 화면안에 들어왔을 때 사진을 불러오도록 하였습니다.
    2. code split : 코드 분할을 라우터에 적용하여 화면 전환 시 lazy-loading 할 수 있도록 하였습니다.
    3. SEO : react-helmet을 사용해 검색엔진 최적화를 하였습니다. 
    4. prerender 적용 : react-snap을 사용하여 빌드가 완료된 후 크롤링 하여 정적 HTML을 생성하도록 하였습니다.

### Error상황의 선언적 처리

- 에러바운더리를 만들어서 그 안에서 에러가 발생하면 componentDidCatch함수에서 sentry에 에러를 기록하고, getDerivedStateFromError 함수에서 state를 갱신하여 fallback UI를 보여주도록 구현하였습니다.

### TDD, E2E Test 도입

- Jest와 React-testing-library를 사용하여 TDD 를 도입하였습니다.
- TDD 도입을 위해 프론트 팀 내 설명을 진행하였고, 개요 및 팁들을 문서화 시키고 있습니다.
- Cypress를 사용하여 E2E Test를 도입하였습니다.

### 레거시 국제화 properties DB화 (6개 언어, 약 6000건)

- 기존 프로젝트의 properties로 작성되어 있는 다국어 파일을 수작업으로 하나하나 google spread sheet로 옮겨야 된다고 하셔서 Node.js로 해당 파일에 있는 내용들을 DB에 넣는 로직을 구현하였습니다.
- DB에 넣은 후 기존 상태 확인 후 쿼리로 기획팀이 주는 문서의 형태로 포맷팅 하여 google spread sheet로 옮겼습니다.

### Tech Stack

  React, Typescript, React-query, i18next, Jest, Cypress, Storybook, Styled-components

### Web Full Stack Engineer, 엑사아이엔티

2020.01 - 2021.04

 

### 대법원 가족관계정보시스템 / 전자가족관계정보시스템

대법원 가족관계정보시스템 / 전자가족관계정보시스템을 유지보수하였습니다. 

### 온라인 출생신고 동사무소 제출 변경에 따른 로직 변경

- 기존 관서로 제출되던 로직을 동사무소로 제출하여 출생신고 프로세스를 간소화 시켰습니다.
- 관련 링크 : [https://www.lawtimes.co.kr/Legal-News/Legal-News-View?serial=163351&kind=AA01](https://www.lawtimes.co.kr/Legal-News/Legal-News-View?serial=163351&kind=AA01)

### 외국인 영문성명 정정에 따른 증명서 발급 프로세스 개선

- 외국인 영문성명이 정정 됨에 따라 한글성명이 일치하지 않을 때 증명서 발급을 제한하는 로직을 추가하였습니다.
- 로직 변경에 따른 데이터 컨버전(약 3700건)도 추가로 진행하였습니다.

### 가족관계등록부 테스트 데이터 생성 자동화(내부용)

- 기존 AP로 하나하나 만들던 테스트 케이스(출생, 혼인, 이혼)를 한 화면으로 만들어 중요한 데이터만 입력 가능하게 하였고, 그에 따른 데이터들을 자동으로 입력시켰습니다. 그로인해 테스트 케이스 생성시간을 단축시켰습니다.
- 테스트 케이스의 랜덤 이름, 랜덤 출생연월일을 추가기능으로 구현하여 고민하는데 들이는 시간을 줄였습니다. 테스트서버 적용 후 대부분의 팀원들이 사용했었습니다.

### Tech Stack
  전자정부프레임워크, Oracle

---
## Skills

### Overall

- 단순 반복적인 업무를 자동화 도구로 만드는 것을 좋아하고, 팀원들이 그것을 사용해 줄 때 즐거움과 보람을 느낍니다.
- 새로운 것을 배우는 것을 두려워 하지 않습니다.
- 유지보수가 용이한 코드를 짜기 위해 노력합니다. 코드 만으로 의도가 명확히 전달되었으면 좋겠다고 생각합니다.

### HTML / CSS

- 시멘틱 마크업을 준수하려고 노력합니다.
- Search Engine Optimization 경험이 있습니다.
- CSS in JS 를 선호합니다.

### Javascript

- ES6 문법에 익숙합니다.
- 타입스크립트 사용에 익숙합니다.

### React

- React hooks을 사용하는 것을 좋아합니다. hook을 이용해 중복되는 로직을 단순화 시키는 것을 좋아합니다.
- Jest를 사용한 테스트 주도 개발을 할 수 있습니다.
- 컴포넌트 라이프사이클을 이용해 에러 처리를 한 경험이 있습니다.

## Education / Study

### Gatsby 개인 블로그 구현

*2021/07 - 현재*

테마를 사용하던 개인 블로그를 Gatsby로 개발하는 중입니다. 

[GitHub - onethegarden/garden-by: lets make gatsby site 🕶](https://github.com/onethegarden/garden-by)

### TDD TODO 미니 프로젝트

*2021/08 - 2021/09*

TDD 훈련을 위해 React, Typescript로 TODO 미니 프로젝트를 진행했습니다.

### 프론트엔드 개발을 위한 자바스크립트 12기

*2021/05 - 2021/06* 

순수 javascript 로 코드리뷰 스터디를 진행하였습니다. 프로그래머스 홈페이지에서 후기를 볼 수 있습니다.

### nomadCoder CSS Layout challenge

*2021/04*

Css layout 스터디를 위해 노마드코더에서 css layout challenge를 수료하였습니다.

### 블랙커피 스터디 5기

*2019/10*

라이브러리를 사용하지 않고 순수 javascript 로 스터디를 진행하였습니다.

---

## License

- SQL개발자(SQLD) (2021.10)
- 정보처리기사 (2019.11)

---

## Contact

### Email
onethegarden@gmail.com

### Github
[onethegarden - Overview](https://github.com/onethegarden)

### Blog
[Jeongwon Blog](https://onethegarden.github.io/)