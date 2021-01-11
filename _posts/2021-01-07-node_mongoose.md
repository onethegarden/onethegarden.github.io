---
layout: post
title: node mongoose connect
---



## mongoose로 서버와 데이터베이스 연결 ##



### 1. mongoose, dotenv 설치

```
$ yarn add mongoose dotenv
```

- detenv : 환경변수들 설정 할 수 있는 파일, 서버주소나 계정, 비밀번호 작성

- .env (환경변수 설정 파일, git에 올릴 때 **gitignore에 필수 작성!**)

  ```
  PORT=4000
  MONGO_URI=mongodb://localhost:27017/blog
  ```

- src/index.js - Node.js에서 환경변수는 **process.env**로 조회 가능

- console로 process.env를 찍어보면 설정한 값을 포함하여 여러 값이 많이 나온다. 

  ```javascript
  require('dotenv').config();
  const Koa = require('koa');
  const Router = require('koa-router');
  const bodyParser = require('koa-bodyparser');
  const mongoose = require('mongoose');
  
  const api = require('./api');
  
  //비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
  const { PORT , MONGO_URI} = process.env;
  
  //mongoose로 데이터베이스 연결
  mongoose
  .connect(MONGO_URI, { useNewUrlParser : true, useFindAndModify: false})
  .then(()=>{
    console.log('Connected to MongoDB');
  }).catch(e => {
    console.error(e)
  })
  
  const app = new Koa();
  const router = new Router();
  
  //라우터 설정
  router.use('/api', api.routes()); //api라우트 적용
  
  //라우터 적용 전에 bodyParser적용
  app.use(bodyParser());
  
  //app인스턴스에 라우터 적용
  app.use(router.routes()).use(router.allowedMethods());
  
  //포트 지정되어 있지 않다면 4000사용
  const port = PORT || 4000;
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
  
  ```





- Model 설정

  - moongoose의 **schema** : 컬렉션에 들어가는 문서 내부의 필드의 형식을 정의하는 객체

    ```
    {
    	title: String,
    	active: Boolean,
    	date: Date
    }
    ```

  - moongoose의 **model** : 스키마를 사용하여 만드는 인스턴스, DB에서 실제 처리할 수 있는 함수들을 가지고 있음

  

- post.js  파일 작성 (Model) : Schema를 정의 한 후 모델을 생성

  ```javascript
  import mongoose from 'mongoose';
  
  const { Schema } = mongoose;
  
  const PostSchema = new Schema({
      title: String,
      body: String,
      tags:[String], //문자열로 이루어진 배열
      publishedDate:{
          type: Date,
          default: Date.now, //현재 날짜를 기본으로
      }
  })
  
  const Post = mongoose.model('Post', PostSchema); //모델 인스턴스 만들기
  export default Post;
  
  ```

  

  



- controller수정

  ```javascript
  import Post from '../../models/post';
  import mongoose from 'mongoose';
  import Joi from 'joi';
  
  //object 검증
  const { ObjectId } = mongoose.Types;
  
  export const checkObjectId = (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
      ctx.status = 400; //Bad Request
      return;
    }
    return next();
  };
  
  /*
  POST /api/posts
  {
      title:'제목',
      body:'내용',
      tags:['태그', '태그2']
  }
  */
  export const write = async ctx => {
    const schema = Joi.object().keys({
      //객체가 다음 필드를 가지고 있음을 검증
      title: Joi.string().required(),
      body: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
    });
    //검증하고 나서 검증 실패한 경우 에러 처리
    const result = schema.validate(ctx.request.body);
    if (result.error) {
      ctx.status = 400;
      ctx.body = result.error;
      return;
    }
    const { title, body, tags } = ctx.request.body;
    //포스트의 인스턴스 만들 때는 new 사용
    const post = new Post({
      title,
      body,
      tags,
    });
  
    try {
      await post.save(); //save로 데이터베이스에 저장
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  /*
   GET /api/posts
  */
  export const list = async (ctx) => {
    try {
      //find() 함수를 호출 한 뒤에는 exec()를 붙여주어야 서버에 쿼리 요청 가능
      const posts = await Post.find().exec();
      ctx.body = posts;
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  /*
   GET /api/posts/:id
  */
  export const read = async (ctx) => {
    const { id } = ctx.params;
    try {
      const post = await Post.findById(id).exec();
      if (!post) {
        ctx.status = 404;
        return;
      }
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  /*
   DELLETE /api/posts/:id
  */
  export const remove = async (ctx) => {
    const { id } = ctx.params;
    try {
      const post = await Post.findByIdAndRemove(id).exec();
      ctx.status = 204; //No Content (성공, 응답할 데이터x);
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  /*
   PATCH /api/posts/:id
  {
      title:'제목',
      body:'내용',
      tags:['태그', '태그2']
  }
  */
  export const update = async (ctx) => {
    const { id } = ctx.params;
    //write에서 사용한 schema와 비슷, required가 없음
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });
    //검증
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    
    try {
      const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
        new: true, //이 값을 설정하면 업데이트된 데이터 반환
        //false 일 때는 업데이트 되기 전 데이터 반환
      }).exec();
      if (!post) {
        ctx.status = 404;
        return;
      }
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  };
  
  ```

  

- **함수정리**

  1. object 검증

     ```
      ObjectId.isvalid(object);//true, false 반환
     ```

  2. 값 찾기 

     ```
     find();
     ```

  3. id로 값찾기

     ```
     findById(id);
     ```

  4. 특정 값 삭제

     ```
     findByIdAndRemove(id);
     ```

  5. 특정 값 수정

     ```
     findByIdAndUpdate(id, updateObject, {new: true})
     ```

     - new : true는 업데이트 된 데이터를 반활할지에 대한 설정값이다. false로 하면 업데이트 하기 전의 값을 반환한다. 







- ***Joi*** : 객체가 해당 필드를 가지고 있는지 검증

ex)

```
const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  //검증하고 나서 검증 실패한 경우 에러 처리
  const result = schema.validate(ctx.request.body);//실패시 
  //실패시 result.error 
```









참고 : 리액트를 다루는 기술(개정판) 21.2장

