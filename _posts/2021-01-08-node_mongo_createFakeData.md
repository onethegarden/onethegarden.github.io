---
layout: post
title: node mongo createFakeData
---



## FakeData dummy 만들기 ##



### 1. createFakeData.js 만들기

```javascript
import Post from './models/post';

export default function createFakeData() {
  //배열 생성 후 포스트 데이터로 변환
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.',
    tags: ['가짜', '데이터'],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}

```



- Post 모델 데이터로 변환 (post 모델은 이전 포스트 node_mongoose 에 있음 )









### 2. createFakeData 함수 실행

- DB 연결하는 부분에서 위에서 만든 함수를 호출해주면 된다. (물론 import 필수)

  ```javascript
  mongoose
  .connect(MONGO_URI, { useNewUrlParser : true, useFindAndModify: false})
  .then(()=>{
    console.log('Connected to MongoDB');
    createFakeData(); //fakedata만들기 <====== 여기 
  }).catch(e => {
    console.error(e)
  })
  ```

  







참고 : 리액트를 다루는 기술(개정판) 22.1장

