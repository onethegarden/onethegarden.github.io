---
layout: post
title: React redux-saga
---


 **Redux-saga**

    > redux thunk 다음으로 많이 쓰는 비동기작업 미들웨어
    제너레이터 함수 문법을 기반으로 비동기 작업을 관리해줌.



    - redux-saga를 사용하는 것이 유리한 경우

        1. 기존 요청을 취소 처리(불필요한 중복 방지)
        2. 특정 액션이 발생했을 때 다른 액션을 발생시킬 때 
        3. API 요청 등 리덕스와 관계없는 코드 실행시킬 때
        4. 웹 소켓을 사용할 때
        5. API 요청 실패 시 재요청 해야할 때 




 **Generator 함수- ES6문법**

    > 함수를 작성할 때 특정 구간에 멈춰 놓을수도 있고, 원할 때 다시 돌아가게 할 수 있음.
    제네레이터 함수를 사용하면 함수에서 순차적으로 값을 반환할 수 있음(리턴값이 여러개인 느낌)

    ```javascript
    function * generatorFunction(){
        console.log('ㄱㄱ');
        yield 1;
        console.log('ㄴㄴ');
        yield 2;
        console.log('ㄷㄷ');
        yield 3;
        return 4;
    }

    const generator = generatorFunction();

    generator.next();//ㄱㄱ
    generator.next();//ㄴㄴ 이런식으로 순서대로 나옴
    ```




- 제네레이터 함수를 호출했을 때 반환되는 객체를 제너레이터라고 부름. 







출처 : 리액트를 다루는 기술(개정판)