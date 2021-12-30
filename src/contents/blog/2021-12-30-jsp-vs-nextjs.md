---
layout: post
categories: ['next', 'ssr']
title: SSR...? jsp...? next.js? 뭐가 다른데?
---

> 참고 문서 : [next js 히치하이커를 위한 안내서](https://medium.com/swlh/the-hitchhikers-guide-to-next-js-fd7aa14ae8d0)
> 

"next.js 히치하이커를 위한 안내서" 라는 글엔 웹개발의 역사를 설명하면서 `next.js`가 탄생하게 된 이유를 설명해준다.

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

### 3.  개발자에게 좋은 **Client-side rendering 와 SPA**
- `JSP` 와 같은 신경써야 할 언어가 하나 줄음
- 사용자가 자신의 컴퓨터에서 코드를 실행하도록 하여 서버의 계산 비용을 절감
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
- 느렸기 때문에 다시 server side rendering으로 전환해야 했지만, Angular나 React와 같은 프레임워크를 버리고 싶지 않았음
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) , [vue-server-renderer](https://ssr.vuejs.org/),  [Angular Universal](https://angular.io/guide/universal) 와 같은 라이브러리를 쓰면 초기 페이지 로딩에 `hydration` 과정을 도입하여 client side 에서 javascript 가 그릴 HTML을 미리 추출함 → 클라이언트에 초기 HTML 응답을 더 빨리 전달
- 추가적으로 [lazy module loading](https://github.com/ModuleLoader/es-module-loader), [code splitting](https://webpack.js.org/guides/code-splitting/), [bundling](https://webpack.js.org/concepts/) 도입으로 훨씬 빨라짐

### 6. 그래서 Next.js ?

- 정적일 수 있는 페이지들의 최적화
- Next.js는 **정적사이트와 동적 사이트를 모두** 잘 처리할 수 있는 페이지 로드 시간에 최적화된 React 프레임워크 (Static-Site Generation, Server-Side Rendering, Client-Side Rendering 모두 지원)
    - 초기에 사용자가 Server에 페이지 접속을 요청하면, SSR방식으로 렌더링 될 HTML을 보냄
    - 사용자, 페이지가 서로 상호작용하여 다른 페이지로 이동할 땐, Server가 아닌 CSR방식으로 브라우저에서 처리함.
- code splitting 자동화 - Bundling 된 파일을 분할해서 로드하여 초기 구동 속도를 빠르게 하고 사용자들에게도 눈에 띄는 성능 향상을 제공
- `/products/1234` 와 같은 동적 URL 매개변수를 허용하는 페이지의 경우에도 **Next.js의 incremental 정적 생성 기능** 을 사용하여 런타임에 정적 페이지를 생성 할 수 있음.
- Vercel에 배포하면 Next.js가 "그냥 작동함." 앱은 전 세계의 서버에 자동으로 배포(CDN)되므로 어디서나 빠르게 로드 됨. Vercel이 자동으로 서버를 관리하므로 사용하지 않는 서버에 대해 비용을 지불하거나 충분한 서버 비용을 지불하지 않아 앱이 느려지는 것에 대해 걱정할 필요가 없음

<br/>
<br/>

## 결론
### jsp 
사용자의 요청마다 서버에서 html로 응답

### next.js 
SSR (default는 SSG) 와 CSR을 전략적으로 사용

결국, next.js에서 말하는 SSR도 SPA로 동작한다.(특히 SSG 는 빌드 시 만들어진 정적파일로 더 빠르게 응답할 수 있음)

`empty html`의 SPA 형태가 아닌 Server Side에서 `hydration`된 `html`을 SPA로 사용하는 것이다.

> 여기서 SSG란 static-site generation으로 빌드 시에 prerender 하는 것을 의미한다. default 값이다



---
아 그리고 next.js에서 SSG와 SSR을 언제 사용하면 좋을지에 대한 내용은 공식문서를 참고하면 좋다. 마침 이전에 번역도 해놨다
- [next.js - Two forms of Pre-rendering](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
- [번역 next.js prerender 요약](http://localhost:8000/2021-12-08-Nextjs-page-prerender/#summary)