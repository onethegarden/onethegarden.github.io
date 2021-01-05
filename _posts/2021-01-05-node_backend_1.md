---
layout: post
title: node backend 1
---



## node backend구축 ##



### 1. 환경 세팅

1. node 설치 (설치 확인)

```
$ node --version
```





2. 프로젝트 생성 (koa 프레임워크도)

```
$ mkdir
$ cd blog
$ mkdir blog-backend
$ cd blog-backend
$ yarn init -y

$ yarn add koa
```







3. ESlint와 Prettier 설정

   

   1) eslint설치 (--dev 는 개발용 의존 모듈로 설치한다는 의미)

```
$yarn add --dev eslint
```

```
$ yarn run eslint --init
```

```python
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No 
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JSON

```

​	

​	2) prettierrc 설정

​	.prettierrc 파일 만들기

```prettierrc
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80
}
```



 3) 설정파일 만들기

```
$ yarn add eslint-config-prettier
```









### 1. koa 사용법



 1) 서버 띄우기

- index.js

```javascript
const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log('Listening to port 4000')
})
```

- 실행 (node를 사용해 실행시엔 node src/index.js 처럼 전체 경로를 쓰는게 맞지만 index는 예외)

```
node src
```



- koa.use : 미들웨어 함수, ctx와 next를 파라미터로 가지고 있음.

  ```
  (ctx, next) => {
  }
  ```

  - ctx : Context, 웹 요청과 응답에 관한 정보를 가지고 있음

  - next : 현재 처리중인 미들웨어 다음의 미들웨어를 호출

  - 미들웨어를 등록하고 next함수를 호출하지 않으면 그 다음 미들웨어를 처리하지 않음.

  - next 함수는 promise를 반환 (Express와 차별점)

    ```javascript
    app.use((ctx, next) => {
      next().then(() => {
        console.log('here');
      });
    });
    ```

  - async/await 사용하기

    ```javascript
    app.use(async (ctx, next) => {
      await next();
      console.log('here');
    });
    ```

    

























참고 : 리액트를 다루는 기술(개정판) 21.2장