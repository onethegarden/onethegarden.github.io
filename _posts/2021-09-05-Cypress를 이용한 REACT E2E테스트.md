---
layout: post
title: Cypress를 이용한 REACT E2E테스트

---

# Cypress를 이용한 REACT E2E테스트

E2E테스트란 프로그램의 워크플로우를 처음부터 끝까지 테스트하는 소프트웨어 테스트 방법이다.

시스템의 무결성을 검증할 수 있도록, 실제 사용자의 시나리오를 구현하는 것을 목표로 한다.





version : 7.0

1. 설치

   ```
   yarn add -D cypress
   yarn add cypress @cypress/react @cypress/webpack-dev-server --dev
   ```

2. 테스트 작성 cypress/integration/auth/login.spec.ts

   ```typescript
   describe('login page', () => {
     beforeEach(() => {
       cy.visit('http://localhost:3000/login');
     });
   
     it('login 동작 확인', () => {
       const userId = 'myid';
       const password = '1234';
       cy.get('#userId').type(userId).should('have.value', userId);
       cy.get('#password').type(password).should('have.value', password);
   
       // 엔터 키보드 이벤트
       cy.get('#password').type(`${password} {enter}`);
   
       cy.get('header').contains('myid');
     });
   
     it('공백 입력 시 에러메세지 현출', () => {
       cy.get('#userId').type(' ');
       cy.contains('아이디를 입력해주세요');
       cy.get('#password').type(' ');
       cy.contains('비밀번호를 입력해주세요');
     });
   
     it('회원가입 페이지 이동', () => {
       cy.contains('sign up').click();
     });
   
     it('이용안내 클릭 시 contact us 페이지 이동', () => {
       cy.contains(/Terms/).click();
       cy.contains('Contact us!');
     });
   });
   
   
   ```



3. 시작 cypress test runner 실행

   ```
   yarn cypress open
   ```

   ![image](https://user-images.githubusercontent.com/51187540/133534443-c25574cb-af2c-47a0-843f-ca458dd7dd4d.png)

   

   이렇게 실행 화면이 뜨는데, 해당하는 테스트 파일을 누르면 테스트가 자동으로 시작된다

   ![image](https://user-images.githubusercontent.com/51187540/133534840-13a50bb0-235a-4fe0-a635-30671bd28aa9.png)





4. 모든 테스트 실행

   ```
   cypress run
   ```

   ![image](https://user-images.githubusercontent.com/51187540/133535358-cff1761c-489e-4cf2-8e6d-c531eb89167a.png)

   모든 테스트 결과를 보여주고 테스트의 비디오도 로컬에 저장을 한다

https://www.cypress.io/blog/2021/04/06/cypress-component-testing-react/





프로젝트를 마이그레이션 하면서 E2E 테스트를 도입했다.

이 테스트가 의미가 있어지려면 QA에서 시나리오를 받아 구현해야 할 것 같다. 