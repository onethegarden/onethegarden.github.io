---
layout: post
categories: ['next', 'ssr']
path: ssr-ssg
title: SSR..? SSG..? jsp...? next.js? 뭐가 다른데?
---


대략적인 흐름과 내용은 [next js 히치하이커를 위한 안내서](https://medium.com/swlh/the-hitchhikers-guide-to-next-js-fd7aa14ae8d0)에서 참고했고, 추가적으로 필요하다고 생각되는 내용을 덧붙였다.

그 중에서 궁금했던 내용인 `jsp` 와 `next.js` 의 차이점에 대한 이유를 정리해 보려고 한다.

먼저, 웹이 변화해 왔던 흐름을 이해하는 게 중요하다. 대부분의 변화는 문제를 해결하려고 한 데서 출발하기 때문이다. 



## 웹이 변화해 왔던 흐름을 간단히 요약하자면,

### 1. 동적인 웹페이지를 위한 JSP, PHP, ASP...
- 서버가 요청에 대한 HTML 을 만들어 내 반환
- 일부는 HTML로, 동적이게 보여줘야 하는 부분은 JSP 문법으로 작성할 수 있었음
- 요청이 많아질수록 페이지가 로드 되는 시간이 길어짐

### 2. javascript 와 ajax가 더 복잡한 웹을 만듦
- `JavaScript` 덕분에 더 상호작용이 많은 웹 페이지가 보편화 됨
- `ajax` 를 통해서 화면 깜빡임(reload) 없이 새로운 데이터를 거의 즉시 업데이트 할 수 있게 됨.
- 이 때 웹 개발자는 `jsp`, `javascript`, `css` , `html` 이 모두 함께 잘 동작하는지 확인해야 했음
- 특히, `ajax`를 통해 데이터를 불러오는 경우엔 **같은 뷰 로직**이 server side에서도 구현되어야 했고, client side에서도 구현되어야 했음... 이 때, 데이터를 공유해야 할 뷰가 많으면 혼돈의 카오스가 시작 됨...

### 3.  개발자에게 좋은 **Client-side rendering 와 SPA**
- `JSP` 와 같은 신경써야 할 언어가 하나 줄음 (java..)
- 사용자가 자신의 컴퓨터에서 코드를 실행하도록 하여 서버의 계산 비용을 절감
- 서버 상에서 돌아가는 코드 없이 브라우저에서 js를 실행, URL에 따른 처리도 전부 Client에서 하게 됨(Single Page Application)
- 개발자가 주로 JavaScript에 집중할 수 있도록 하기 때문에 생산성에 좋았음
- 복잡한 웹을 개발하기 좋았음

### 4. Client-side rendering 의 문제
- 초기 로딩속도가 느림 !
    - JavaScript를 다운로드하여 실행하고 JavaScript를 통해 DOM을 조작하는 것은 많이 비용이 듦
    - 많은 스크립트와 기타 파일(이미지나 CSS)이 동시에 로드되면 로드 시간이 더욱 악화
    - 특히, 인프라가 좋지 않은 나라일 경우 이 문제가 더욱 더 심해짐
    - 모바일 웹의 경우는 이 때 충분히 강력하지 않았고 무선 네트워크 속도는 오늘날만큼 크지 않았었음
- SEO
    - 크롤러 봇은 HTML을 스크래핑 함
    - Client-side rendering은 비어있는 HTML에 Javascript 로 화면을 그리기 때문에 스크래핑 한 이후에 페이지가 로드됨

### 5. 다시 Server-side rendering으로 !
- `node.js`의 발전으로 서버에 javascript 언어를 쓸 수 있게 되면서 다시 서버로 렌더링을 하고자 함
- 느렸기 때문에 다시 server side rendering으로 전환해야 했지만, Angular나 React와 같은 프레임워크를 버리고 싶지 않았음
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) , [vue-server-renderer](https://ssr.vuejs.org/),  [Angular Universal](https://angular.io/guide/universal) 와 같은 라이브러리를 쓰면 초기 페이지 로딩에 `hydration` 과정을 도입하여 client side 에서 javascript 가 그릴 HTML을 미리 추출함 → 클라이언트에 초기 HTML 응답을 더 빨리 전달
- 추가적으로 [lazy module loading](https://github.com/ModuleLoader/es-module-loader), [code splitting](https://webpack.js.org/guides/code-splitting/), [bundling](https://webpack.js.org/concepts/) 도입으로 훨씬 빨라짐
- client side의 hydration을 위한 server-side rendering은 쉽지 않았음
- 서버 관리가 필요해짐

### 6. Next.js 의 Static Site Generator?

- **Static Site Generator**
    - 정적일 수 있는 페이지들의 최적화 -> 사이트의 모든 페이지를 미리 정적으로 만들어버림(동적인 페이지 포함)
    - 다시 서버가 필요없게 됨
    - CDN에서 제공되는 정적 HTML을 사용하면 로드 속도가 상당히 빨라짐
    - 동적으로 렌더링해야하는 컨텐츠가 많을 경우 빌드시간이 오래걸림
    - 변경할 내용이 있을 때마다 빌드하고 배포해야 함
- **Next.js**
    - Next.js는 **정적사이트와 동적 사이트를 모두** 잘 처리할 수 있는 페이지 로드 시간에 최적화된 React 프레임워크 (Static-Site Generation, Server-Side Rendering, Client-Side Rendering 모두 지원)
    - `/products/1234` 와 같은 동적 URL 매개변수를 허용하는 페이지의 경우에도 **Next.js의 incremental 정적 생성 기능** 을 사용하여 런타임에 정적 페이지를 생성 할 수 있음.
    - code splitting 자동화 - Bundling 된 파일을 분할해서 로드하여 초기 구동 속도를 빠르게 하고 사용자들에게도 눈에 띄는 성능 향상을 제공
    - Vercel에 배포하면 Next.js가 "그냥 작동함." 앱은 전 세계의 서버에 자동으로 배포(CDN)되므로 어디서나 빠르게 로드 됨. Vercel이 자동으로 서버를 관리하므로 사용하지 않는 서버에 대해 비용을 지불하거나 충분한 서버 비용을 지불하지 않아 앱이 느려지는 것에 대해 걱정할 필요가 없음

<br/>
<br/>

## 결론
### jsp 
- 별도의 서버가 필요함
- 요청마다 서버에서 html로 응답, 인터렉션은 client에서 javascript 로 실행
- ajax로 데이터를 불러오는 경우 같은 뷰가 Server와 Client에서 구현이 되었어야 함

### next.js 
- Serverless(여기서 Serverless는 서버가 없다는 게 아님, 클라우드에 리소스만 할당하고 배포해서 서버에 대한 생각을 할 필요가 없다는 말임)
- SSR (default는 SSG) 와 CSR을 선택적으로 사용
    - Static Generation : 빌드 시 HTML 이 생성되고, 각 요청에 사용됨
    - Server-side Rendering : 각 요청에 대해 HTML 이 생성
- 결국, next.js에서 말하는 SSR도 SPA로 동작한다.(특히 SSG 는 빌드 시 만들어진 정적파일로 더 빠르게 응답할 수 있음)
- `empty html`의 SPA 형태가 아닌 Server Side에서 `hydration`된 `html`을 SPA로 사용하는 것이다.

> 여기서 SSG란 static-site generation으로 빌드 시에 prerender 하는 것을 의미한다. default 값이다



---
이 글을 쓰면서 웹을 구성하는 기술들의 변화를 쭉 훑을 수 있었다. `JSP`와 `React`, `SSG`는 직접 사용하면서 와닿았던 부분이 많아 쉽게 작성할 수 있었다.

하지만, `다시 Server-side rendering으로` 이 부분은 직접 써 보지 않아 제일 위에 첨부한 링크를 많이 참고했고,
 `next.js`에서 `SSG`와 `SSR`을 선택적으로 사용하는 부분은 직접 구현을 해 봐야 제대로 알 것 같다.
그리고 `CDN`에 배포했을 때의 빠르기도 직접 구현해 보면서 측정해보면 더 크게 와닿을 것 같다.

---
## 참고문서

아 그리고 next.js에서 SSG와 SSR을 언제 사용하면 좋을지에 대한 내용은 공식문서를 참고하면 좋다. 마침 이전에 번역도 해놨다
- [next.js공식문서 - Two forms of Pre-rendering](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
- [번역 next.js prerender 요약](http://localhost:8000/2021-12-08-Nextjs-page-prerender/#summary)

서버리스에 대한 글
- [벨로퍼트님 블로그 - 서버리스 아키텍쳐(Serverless)란?](https://velopert.com/3543)

웹개발의 역사를 설명하면서 `next.js`가 탄생하게 된 이유를 설명해준다. 
- [next js 히치하이커를 위한 안내서](https://medium.com/swlh/the-hitchhikers-guide-to-next-js-fd7aa14ae8d0)
