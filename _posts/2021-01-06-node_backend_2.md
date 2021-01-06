---
layout: post
title: node backend 2
---



## node backend구축 2 ##



### 1. nodemon사용 (서버 자동 렌더링)

1. nodemon설치

```
$ yarn add --dev nodemon
```



2. package.json 수정 ( script 추가 )

```
  "scripts": {
    "start": "node src",
    "start:dev": "nodemon --watch src/index.js"
  }
```

- start : 서버를 시작하는 명령어

- start:dev : nodemon 을 통해 서버를 실행해주는 명령어 , nodemon이 src가 변경되면 index.js를 재시작 해줌 

- ```
  $ yarn start:dev
  ```





### 2. koa-router 사용

```
$ yarn add koa-router
```

- 예시 코드

  ```
  const Koa = require('koa');
  const Router = require('koa-router');
  
  const app = new Koa();
  const router = new Router();
  
  router.get('/', ctx => {
      ctx.body = "홈";
  })
  router.get('/about', ctx => {
      ctx.body = "소개";
  })
  //app 인스턴스에 라우터 적용
  app.use(router.routes()).use(router.allowedMethods());
  
  app.listen(4000, () => {
    console.log('Listening to port 4000');
  });
  
  ```

  - router.get의 첫번째 파라미터에는 경로, 두 번째 파라미터는 미들웨어 함수

  - get은 해당 라우트에서 사용할 HTTP 메서드를 의미, put, post, delete등을 넣을 수 있음

  - 라우터 파라미터 예시 (/about/react)

    ```
    router.get('/about/:name?', ctx => {
        const { name } = ctx.params;
        ctx.body = name ? `${name}의 소개` : '소개';
    })
    ```

  - 라우터 쿼리 예시 (/posts?id=10)

    ```
    router.get('/posts', ctx => {
      const {id} = ctx.query;
      ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
    })
    ```

    





### 3. REST API

- 클라이언트 서버에서 요청을 받아 데이터 베이스에 접근하여 작업을 처리
- HTTP 메서드의 종류

| 메서드 | 설명                                             |
| ------ | ------------------------------------------------ |
| GET    | 데이터를 조회할 때 사용                          |
| POST   | 데이터를 등록할 때 사용, 인증작업을 거칠 때 사용 |
| DELETE | 데이터를 삭제할 때 사용                          |
| PUT    | 데이터를 전체 값 변경                            |
| PATCH  | 데이터의 특정 값 변경                            |



- REST API요청 테스팅 (포스트 맨 다운로드)

  ```
  https://www.postman.com/downloads/
  ```

  POST, DELETE, PUT, PATCH 자바스크립트 API없이 요청 테스트 해볼 수 있음









### 4. controller 만들기

- 미들웨어 적용 

```
$ yarn add koa-bodyparser
```



- posts/posts.ctrl.js 파일 생성

  ```javascript
  let postId = 1; //id초기값
  
  const posts = [
      {
          id:1,
          title: '제목',
          body:'내용'
      },
  ];
  
  /* 포스트 작성
  POST /api/posts
  {title, body}
  */
  exports.write = ctx => {
      // REST API의 request body 는 ctx.request.body에서 조회 가능
      const {title, body} = ctx.request.body;
      postId +=1;
      const post = {id: postId, title, body};
      posts.push(post);
      ctx.body = post;
  }
  
  /* 포스트 목록 조회
  GET /api/posts
  */
  exports.list = ctx => {
      ctx.body = posts;
  }
  
  /* 특정 포스트 조회
  GET /api/posts/:id
  */
  exports.read = ctx => {
      const { id } = ctx.params;
      //주어진 id로 포스트 찾기
      //파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나 
      //비교할 p.id값을 문자열로 변경
      const post = posts.find(p => p.id.toString() === id);
      if(!post){
          ctx.status = 404;
          ctx.body = {
              message: '포스트가 존재하지 않습니다.',
          };
          return;
      }
      ctx.body = post;
  }
  
  /* 특정 포스트 삭제
  DELETE /api/posts/:id
  */
  exports.remove = ctx => {
      const { id } = ctx.params;
      //해당 id를 가진 post가 몇 번째인지 확인
      const index = posts.findIndex(p => p.id.toString() === id);
      if(index === -1){
          ctx.status = 404;
          ctx.body = {
              message: '포스트가 존재하지 않습니다.',
          };
          return;
      }
      //index번째 아이템 제거
      posts.splice(index, 1);
      ctx.status = 204; //No Content
  }
  
  
  /* 포스트 수정(교체)
  PUT /api/posts/:id
  */
  exports.replace = ctx => {
      const { id } = ctx.params;
      //해당 id를 가진 post가 몇 번째인지 확인
      const index = posts.findIndex(p => p.id.toString() === id);
      if(index === -1){
          ctx.status = 404;
          ctx.body = {
              message: '포스트가 존재하지 않습니다.',
          };
          return;
      }
      //전체 객체 덮어씌우기, 
      //id를 제외한 기존 정보 날리고, 객체 새로 만들기
      posts[index] = {
          id,
          ...ctx.request.body,
      }
      ctx.body = posts[index];
  };
  
  
  /* 포스트 수정(특정 필드 변경)
  PATCH /api/posts/:id
  */
  exports.update = ctx => {
      const { id } = ctx.params;
      //해당 id를 가진 post가 몇 번째인지 확인
      const index = posts.findIndex(p => p.id.toString() === id);
      if(index === -1){
          ctx.status = 404;
          ctx.body = {
              message: '포스트가 존재하지 않습니다.',
          };
          return;
      }
      //기존 값에 정보를 덮어씌우기
      posts[index] = {
          ...posts[index],
          ...ctx.request.body,
      }
      ctx.body = posts[index];
  };
  
  ```



- 라우트에 연결 (src/api/posts/index.js)

  ```
  const Router = require('koa-router');
  const postsCtrl = require('./posts.ctrl');
  
  const posts = new Router();
  
  posts.get('/', postsCtrl.list);
  posts.post('/', postsCtrl.write);
  posts.get('/:id', postsCtrl.read);
  posts.delete('/:id', postsCtrl.remove);
  posts.put('/:id', postsCtrl.replace);
  posts.patch('/:id', postsCtrl.update);
  
  
  module.exports = posts;
  ```

  











참고 : 리액트를 다루는 기술(개정판) 21.2장

