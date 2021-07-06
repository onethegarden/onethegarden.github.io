---
layout: post
title: Programers JavascriptStudy Review
---



# Programers JavascriptStudy Review

>프로그래머스 자바스크립트 스터디에서 배운 것들과 정보들을 정리하고자 한다. 

<br/><br/><br/><br/><br/><br/>

## 시작 전 참고자료

- [JavaScript 첫걸음](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps) - MDN의 자바스크립트 입문 문서
- [JavaScript 재입문하기](https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript) - 오해받고 있는? 자바스크립트에 대해 짧게 요약해둔 문서 ( 잘 모르고 쓰면 오류가 나는 부분들을 다시 짚어보자)
- [브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361) - 브라우저의 동작에 대한 글
- [자바스크립트의 비동기 처리와 콜백함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) - 자바스크립트의 비동기 처리에 대한 블로그 글
- [DOM은 무엇일까?](https://wit.nts-corp.com/2019/02/14/5522) - DOM에 대해 정리해둔 아티클

<br/><br/><br/><br/>

## 책 추천

- 더글라스 크락포드의 자바스크립트 핵심가이드 - 더글라스 크락포드
- 자바스크립트는 왜 그 모양일까? - 더글라스 크락포드
- 자바스크립트 성능 최적화 - 니콜라스 자카스
- 모던 자바스크립트 - 니콜라스 자카스 (es6문법 이해하는데 좋음)
- 읽기 좋은 자바스크립트 코딩 기법 - 니콜라스 자카스
- you don't know js - 중급자에게 추천

<br/><br/><br/><br/>

## 코드관련

1. **EOL (End of line)**

   ![image](https://user-images.githubusercontent.com/51187540/123635773-01ddce80-d857-11eb-8ffe-df2f9535d2ad.png)

   - GitHub에서 이런 표시를 볼 수 있을 것이다.

     new line으로 끝나지 않은 행은 실제 행으로 간주되지 않을수도 있다.  항상 맨 아래에 비어있는 행을 추가하여 파일이 끝났음을 알려주어야 한다. POSIX명세에 이렇게 써있다.

     ```
     3.206 Line
     A sequence of zero or more non- <newline> characters plus a terminating <newline> character.
     ```

     prettier를 통해 저장시 자동으로 이 행이 추가되게 설정할 수 있다.

     ```
     {
       "endOfLine": "auto",
     }
     ```


<br/><br/>

2. **단축평가, truthy, falsy 의 위험성**

   ```
   if(!data) return;
   ```

   - js는 타입이 없어서 이런식으로 에러를 던지면 의도치 않은 동작이 발생할 수 있음.
   - null 체크는 lodash의 isNil을 참고

<br/><br/>

3. **변수명**
   - 줄임말을 사용하지 말자 Nm은 Name인지 Nanometer 인지 New Mexico인지 쓰는사람 말고는 모른다 
   -  누구나 보고 최대한 이해하기 쉽게 설명적으로 작성하기
   - [Javascript Naming Convention](https://www.robinwieruch.de/javascript-naming-conventions) 

<br/><br/>

4. **비동기 처리**

- 저수준에서 발생시키고 고수준에서 처리 ```callee```에서 발생, ```caller```에서 처리

  - 예시코드

    ```javascript
    // api.js
    const request = async () => {
      const response = await fetch('FAKE_URL')
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json()
    }

    // index.js
    const HTTP_STATUS_CODE = {
      OK: 200,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      SERVER_ERROR: 500
    }

    const fetchData = async () => {
      try {
        const someData = await request()
      } catch(e) {
        switch (e.status) {
          case HTTP_STATUS_CODE.BAD_REQUEST:
            console.error('잘못된 요청이')
            break
          case HTTP_STATUS_CODE.NOT_FOUND:
            console.error('찾는 데이터가 없음')
            break
          case HTTP_STATUS_CODE.SERVER_ERROR:
            console.error('서버 에러')
            break
          default:
            console.error(`에러: ${e}`)
        }
      }
    }
    ```


- [비동기함수와 일반함수, 비동기 함수의 callback 시각화](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

<br/><br/>

5. **시멘틱 태그, HTML의 중요성**

- 크롤러가 우리가 만든 사이트를 크롤링 해갈 때 HTML 코드만으로 그 의미를 인지하기 때문에 Semantic요소를 해석한다. 
- 웹은 누구나 이용 가능해야 한다. 


- [시멘틱 웹이란?](https://www.semrush.com/blog/semantic-html5-guide/?kw=&cmp=EA_SRCH_DSA_Blog_SEO_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=431603845883&kwid=dsa-834686684576&cmpid=9874915430&gclid=Cj0KCQjwhZr1BRCLARIsALjRVQMALQ-PFX7NKeCiHJWm3AkRMnvnh5f6j9gz2Dqpik6RZZmo0Akzst8aAkdLEALw_wcB)
  - HTML의 시멘틱 태그에 대한 글, 시멘틱 웹이 왜 필요한지, 태그의 구조 등
- [facebook 에 공유하는 문서 최적화](https://developers.facebook.com/docs/sharing/webmasters/#testing)
  - 데스크톱, 모바일 웹, 모바일 앱 등 공유된 위치와 관계없이 Facebook에 공유하는 웹 호스팅된 콘텐츠를 최적화하는 방법
  - 시멘틱 태그가 중요한 이유 
- [구글검색 최적화](https://developers.google.com/search/docs/beginner/seo-starter-guide)
  - 구글 크롤러에 웹페이지 최적화 시키는 방법
  - 시멘틱 태그가 중요한 이유 

<br/><br/><br/>

## 인사이트

-  [리액트처럼 사고하기 ](https://ko.reactjs.org/docs/thinking-in-react.html) 
   -  vanilla js로 리액트스럽게? 설계를 하고 싶을 때 참고하면 좋을 문서, component를 나누고 state를 어떻게 관리할지 참고할 수 있다.

- [구글 - 브라우저의 렌더링 순서](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
  - ex) 브라우저 주소창에 www.naver.com을 쳤을 때 화면이 뜨기까지 설명하세요가 **면접 단골질문**이므로 숙지하도록 하자 ! (Render-tree Construction, Layout, and Paint 까지는 필수로 읽어보기)
  - [네이버 - 브라우저는 어떻게 동작하는가]( https://d2.naver.com/helloworld/59361)

- [브라우저의 Reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
  - 브라우저의 relflow를 유발하는 요소들에 대한 설명

- [파이썬 - CodeTags](https://www.python.org/dev/peps/pep-0350/#id22)
  - 주석을 달 때 TODO, FIXME, HACK 와 같은 키워드랑 같이 써서 전체검색해서 고치는 시간을 갖는 것도 좋다

- [리액트 만들기 튜토리얼](https://pomb.us/build-your-own-react/) 
  - 일단,, 사이트가 좋아보인다 스크롤에 반응해 코드가 나타나고 사라진다,,,다른 분이 슬랙에서 이 코드를 보고 Hook의 내부원리를 이해하는데 도움이 되었다고 한다! 

-  [Frontend boilerplate](https://github.com/pankod/superplate)

   -  여러 종류의 boilerplate

-  [크롬 extension -  record heap snapshot](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots/)

   ​

<br/><br/><br/>

## 커뮤니티 

- [프로그라피](http://prography.org/) : 프로그래머와 디자이너의 모임, 팀별 프로젝트로 서비스 기획 및 배포
- https://dnd.ac/ : 개발자와 디자이너가 함께 프로젝트 진행
- [DDD](https://medium.com/@dddstudy1) : 개발자, 디자이너가 함께 프로젝트 진행 
- [그 이외의 정보](https://velog.io/@prayme/%EB%8C%80%ED%95%99%EC%83%9D-IT-%EC%97%B0%ED%95%A9-%EB%8F%99%EC%95%84%EB%A6%AC-%EC%A0%95%EB%B3%B4-%EB%AA%A8%EC%9D%8C-feat.-RUFree-%EC%A3%BC%EB%8B%88%EC%96%B4)

<br/><br/><br/>



## 사전퀴즈

- 1번 문제 - new

  ```javascript
  function Cat(name, age){
  	this.name = name;
  	this.age = age;
  }
  const tabby1 = Cat('nana', 5)
  console.log(tabby1.name); //출력되는 값은?
  ```

  > 🔑 오류가 발생한다. 

  `apply`, `call`, `bind` 등으로 `this`에 대해 주입한 상황이 아니고 **`new` 키워드없이** 실행한 함수 내 this는 전역 객체(window)를 바라보기 때문에 에러가 발생

  ```new```를 붙이지 않았을 때 에러처리 필요 -> ```new.target```으로 확인 가능! 

<br/>

- 2번 문제 - 즉시실행함수

  ```javascript
  (function(name){
      console.log(`hello ${name}`)
  })('roto')
  ```

  > 🔑  ```hello roto```가 출력된다.

  즉시실행함수 (IIFE, Immediately Invoked Function Expression) 이 함수를 정의함과 동시에 실행되기 때문에

  즉시실행함수 사용 이유 : 전역공간을 더럽히지 않고 코드를 모듈러 하려고 썼던 기법, 최근에는 const 나 let, 웹팩이나 모듈화되면서 그 역할들을 걔들이 해주고 있음

<br/>

- 3번 문제 - 함수의 스코프

  ```javascript
  var idiots = {
      name: 'idiots',
      genre: 'punk rock',
      members:{
          roto:{
              memberName: 'roto',
              play: function(){
                  console.log(`band ${this.name} ${this.memberName} play start`)
              }
          }
      }
  }

  idiots.members.roto.play()
  ```

  > 🔑 ```band undefined roto play start```출력

  play 함수 안에는 name이 없기 때문

  해결하려면  ```console.log(`band ${idiots.name} ${this.memberName} play start.`)```

<br/>

- 4번 문제 - 해당 코드를 실행하면 에러가 나는데, 의도대로 실행하는 방법을 아는대로 설명

  ```javascript
  function RockBand(members){
      this.members = members;
      this.perform = function(){
          setTimeout(function(){
              this.members.forEach(function(member){ member.perform() })
          }, 1000)
      }
  }

  var theOralcigarettes = new RockBand([
      {
          name: 'takuya',
          perform: function(){console.log(' a e u i a e u i')}
      }
  ])
  ```

  > 🔑  ```theOralcigarettes.perform()```을 실행하는 함수가 빠짐
  >
  > 🔑 ```setTimeout```으로 인해 this는 RockBand의 this가 아님
  >
  > 해결법 1. 클로저 이용 
  >
  > ```javascript
  > function RockBand(members) {
  >     var that = this;//context 밖에 있는 변수에 접근하기 위한 것 
  >     this.members = members;
  >     this.perform = function() {
  >       setTimeout(function(){
  >         that.members.forEach(function(member){ member.perform() })
  >       }, 1000)
  >     }
  >   }
  > ```
  >
  > 해결법 2. bind이용
  >
  > ```javascript
  > function RockBand(members) {
  >     var that = this;
  >     this.members = members;
  >     this.perform = function() {
  >       setTimeout(function(){
  >         this.members.forEach(function(member){ member.perform() })
  >       }.bind(this), 1000)
  >     }
  >   }
  > ```

<br/>

- 5번 문제 - 해당 코드를 실행하면 숫자가 순차적으로 출력되지 않고 5만 출력된다. 왜 그런 현상이 발생하는지, 어떻게 수정하면 좋을지 서술

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  for(var i = 0; i < nummbers.length; i++){
      setTimeout(function(){
          console.log(`number index ${i}`)
      }, 3000)
  }
  ```

  > setTimeout이 실행되는 시점에는 루프가 이미 끝나있어서 ```i=5``` 임 
  >
  > 실제로 for문 안의 ```var```은 ```global```영역임
  >
  > 🔑 ```var i = 0``` 을 ```let i = 0```으로 쓰는 것으로 해결
  >
  > 🔑 setTimeout을 IIFE로 감싸고 파라메터로 i를 넘기는 것으로 해결 
  >
  > ```javascript
  > const numbers = [1, 2, 3, 4, 5];
  > for(var i = 0; i < numbers.length; i++){ 
  > (function(count){
  >  setTimeout(function(){
  >    console.log(`number index ${count}`);
  >  }, 1000);
  > })(i)
  > }
  > ```

<br/>

- 7번 문제 - var, let, const차이

  > 🔑 
  >
  > var : function level scope, 호이스팅 현상, 재할당가능
  >
  > let : block level scope, 재할당 가능
  >
  > const: block level scope, 재할당 불가능, 그러나 할당된 객체의 함수를 이용해 객체 변경 가능
  >
  > ex)
  >
  > ```javascript
  > const arr = []
  > arr = [1, 2]; //error
  >
  > arr.push(1); //가능
  > ```

<br/>

- 8번 문제 - 클로저란?

  > 🔑  자신의 scope 외부에 있는 것을 가져와 쓰는 것
  >
  > ```javascript
  > var a = 1;
  > function hello(){
  >     console.log(a); 
  > }
  > ```
  >
  > 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
  >
  > https://hyunseob.github.io/2016/08/30/javascript-closure/

<br/><br/><br/><br/>