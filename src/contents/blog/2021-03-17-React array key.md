---
layout: post
title: React array key
path: react-array-key
categories: ["React"]
---

## React key 존재 유무에 따른 업데이트 방식

너무 당연하게 쓰고 있던 건데 왜 key를 써야 하는지

안쓰면 콘솔에 에러로그가 찍히는지에 대한 내용이다 🙄

예를 들어서 다음과 같은 배열이 있고 이 배열을 렌더링 했을때

### key 가 없을 때

```javascript
const array = ["a", "b", "c", "d"];

//렌더링
array.map((item) => <div>{item}</div>);
```

이 배열의 `b`와 `c` 사이에 `z`를 삽입하게 된다면, 리렌더링을 할 때

`b`와 `c`사이에 새 태그 를 삽입하는게 아니라

1. 기존의 `c`를 `z`로 바꾸고
2. `d`는 `c`로 바뀌고
3. 맨 마지막에 `d`가 새로 삽입되게 됨.

### key가 있을 때

```
[
  {
    id: 0,
    text: 'a'
  },
  {
    id: 1,
    text: 'b'
  },
  {
    id: 2,
    text: 'c'
  },
  {
    id: 3,
    text: 'd'
  }
];
```

이런식으로 키가 있고 이렇게 렌더링이 된다면

```javascript
array.map((item) => <div key={item.id}>{item.text}</div>);
```

<u>**기존의 값은 그대로 두고 그 사이에 값을 삽입**</u>하게 된다.

그래서 배열을 렌더링 할 때는 고유한 `key` 값이 있는게 중요하고,

중복되는 `key`가 있을 때에는 렌더링시에 오류메시지가 콘솔에 나타나게 되고

업데이트가 정상적으로 이루어지지 않는다.

출처 : [배열 렌더링하기](https://react.vlpt.us/basic/11-render-array.html)
