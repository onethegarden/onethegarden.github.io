---
layout: post
title: 웹 최적화하기(code-split, prerender)

---

# 웹 최적화하기(code-split, prerender)



## 1. iframe 제거



현재 마이그레이션 하고 있는 사이트의 메인 페이지에 `구매 후기` 를 보면 iframe으로 유튜브를 불러오고 있습니다.

슬라이드로 넘어가고 있지만, lazy loading 처리가 되어있지 않아  처음 페이지를 불러올 때 한 번에 8개의 유투브 iframe을 불러옵니다.

이렇게 옥션위니 안에 유투브를 8개나 가지고 있기 때문에 초기 렌더링 속도가 느릴 수 밖에 없습니다. 리액트로 적용했을 때도 마찬가지 입니다. 

보안에도 취약하고 성능에도 아주 좋지 않습니다.



먼저 이 문제가 되는 iframe에 대해 알아보도록 합니다.

**🧐 iframe 이란?**

>iframe 이란 inline frame 으로 현재 document 안에 다른 HTML 페이지를 삽입한다.
>
>각각의 브라우징 맥락은 완전한 문서 환경이므로, 페이지에 `<iframe>`을 추가할 때마다 메모리 및 기타 컴퓨터 자원 사용량이 늘어납니다. 이론상으로는 원하는 만큼 `<iframe>`을 사용할 수 있지만, 성능 문제가 없는지 확인하세요.

>https://developer.mozilla.org/ko/docs/Web/HTML/Element/iframe



iframe이 메인페이지에 없는 게 가장 좋겠지만, 

기존 옥션위니 메인페이지를 유지하면서 iframe 을 최대한 불러오지 않는 방법을 고민하였습니다.

 재생 버튼을 css 로 만들어 기존의 유투브를 불러온 것 처럼 보이게 하고, css로 만든 비디오의 재생 버튼을 누를 때 iframe을 불러오도록 하였습니다. 







---



## 2. Code split

앱이 커지면 번들도 커지기 때문에 로드되는 시간이 길어지는 것을 주의해야 합니다. 코드 분할은 'lazy loading' 할 수 있도록 도와줍니다.

코드분할을 라우터에 적용하였습니다. (라우터 뿐만 아니라 다른 부분에도 적용해도 됩니다.)

웹 페이지를 불러오는 시간은 페이지 전환에 어느 정도 발생하며 대부분 페이지를 한번에 렌더링하기 때문에 사용자가 페이지를 렌더링하는 동안 다른 요소와 상호작용하지 않습니다.



```react
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```





## 3. prerender

### react snap을 이용한 pretender

react snap 을 적용해서 빌드가 완료된 후 크롤링 하여 정적 html을 생성하도록 합니다.

react snap의 적용 예시는 이전 `REACT SEO 적용` 이라는 이름으로 포스트를 작성해 두었습니다.





---

# 결과



기존 페이지

![default](https://user-images.githubusercontent.com/51187540/130179533-5d19c710-f043-475b-bdc7-8eee6fa59117.png)









개선한 프로젝트의 프리렌더 적용 전

![image](https://user-images.githubusercontent.com/51187540/130179684-b4aef84d-824e-49f3-a177-bdbe28795276.png)







개선한 프로젝트의 프리렌더 적용 이후

![image](https://user-images.githubusercontent.com/51187540/130179812-088a8c45-5e06-42f4-9b4d-55bdec7c75b4.png)

