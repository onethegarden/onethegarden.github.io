---
layout: post
title: react returnActionType
---



## React return Action Type ##



ACTION Type을 작성하다보면 각 요청마다 액션타입  세 개(ACTION, ACTION_SUCCESS, ACTION_FAILURE)를 설정해야 하는데, 중복되는 코드도 많고 좀 귀찮다고 생각했었다. 

이번에 react blog 구현하면서 정리해 놓으면 좋을 것 같아 작성해본다.

### 1. 기존 액션타입 정의

```javascript
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
```



- 액션마다 성공, 실패를 정의







### 2. 액션타입 설정하는 함수 작성하여 사용

1. 액션타입 설정 함수

```javascript
export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}
```

- 요청에 SUCCESS, FAILURE 붙여서 리턴





2. 1번에서 만든 함수 호출

```javascript
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
```

- 개인적으로 이게 더 좋은 것 같다. 
- 가끔 하나하나 타자로 칠 때 오타가 난 경우가 있었는데 함수로 만들어 사용하면 오타가 날 확률이 더 줄어들 거니까 ㅎㅎ













참고 : 리액트를 다루는 기술(개정판) 24.2.4.5장

