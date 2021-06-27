---
layout: post
title: Programers JavascriptStudy Review
---



## Programers JavascriptStudy Review

>프로그래머스 자바스크립트 스터디에서 배운 것들과 정보들을 정리하고자 한다. 



### 시작 전 참고자료

- [JavaScript 첫걸음](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps) - MDN의 자바스크립트 입문 문서
- [JavaScript 재입문하기](https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript) - 오해받고 있는? 자바스크립트에 대해 짧게 요약해둔 문서 ( 잘 모르고 쓰면 오류가 나는 부분들을 다시 짚어보자)
- [브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361) - 브라우저의 동작에 대한 글
- [자바스크립트의 비동기 처리와 콜백함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) - 자바스크립트의 비동기 처리에 대한 블로그 글
- [DOM은 무엇일까?](https://wit.nts-corp.com/2019/02/14/5522) - DOM에 대해 정리해둔 아티클



### 사전퀴즈

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

  `apply`, `call`, `bind` 등으로 `this`에 대해 주입한 상황이 아니고 `new` 키워드없이 실행한 함수 내 this는 전역 객체(window)를 바라보기 때문에 에러가 발생



- 2번 문제 - 즉시실행함수

  ```javascript
  (function(name){
      console.log(`hello ${name}`)
  })('roto')
  ```

  > 🔑  ```hello roto```가 출력된다.

  즉시실행함수 (IIFE, Immediately Invoked Function Expression) 이 함수를 정의함과 동시에 실행되기 때문에



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
  >     var that = this;
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



- 5번 문제 - 해당 코드를 실행하면 숫자가 순차적으로 출력되지 않고 5만 출력된다. 왜 그런 현상이 발생하는지, 어떻게 수정하면 좋을지 서술

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  for(var i = 0; i < nummbers.length; i++){
      setTimeout(function(){
          console.log(`number index ${i}`)
      }, 3000)
  }
  ```

  >  setTimeout이 실행되는 시점에는 루프가 이미 끝나있어서 i=5 임
  >
  > 🔑 var i = 0 을 let i=0으로 쓰는 것으로 해결
  >
  > 🔑 setTimeout을 IIFE로 감싸고 파라메터로 i를 넘기는 것으로 해결 
  >
  > ```javascript
  > const numbers = [1, 2, 3, 4, 5];
  > for(var i = 0; i < numbers.length; i++){ 
  >   (function(count){
  >     setTimeout(function(){
  >       console.log(`number index ${count}`);
  >     }, 1000);
  >   })(i)
  > }
  > ```





- 7번 문제 - var, let, const차이

  >🔑 
  >
  >var : function level scope, 호이스팅 현상, 재할당가능
  >
  >let : block level scope, 재할당 가능
  >
  >const: block level scope, 재할당 불가능, 그러나 할당된 객체의 함수를 이용해 객체 변경 가능
  >
  >ex)
  >
  >```javascript
  >const arr = []
  >arr = [1, 2]; //error
  >
  >arr.push(1); //가능
  >```



- 8번 문제 - 클로저란?

  >🔑  자신의 scope 외부에 있는 것을 가져와 쓰는 것
  >
  >``` javascript
  >var a = 1;
  >function hello(){
  >    console.log(a); 
  >}
  >```
  >
  >참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
  >
  >https://hyunseob.github.io/2016/08/30/javascript-closure/



### 1강 



### 2강  

-  [리액트처럼 사고하기](https://ko.reactjs.org/docs/thinking-in-react.html)
-  [타입스크립트 무료강의](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%A6%AC%EC%95%84-1705-%EA%B8%B0%EC%B4%88-%EC%84%B8%EB%AF%B8%EB%82%98#)





### 3강  

- [구글 - 브라우저의 렌더링 순서](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
  - ex) 브라우저 주소창에 www.naver.com을 쳤을 때 화면이 뜨기까지 설명하세요가 면접 단골질문이므로 숙지하도록 하자 ! (Render-tree Construction, Layout, and Paint 까지는 필수로 읽어보기)
  - [네이버 - 브라우저는 어떻게 동작하는가]( https://d2.naver.com/helloworld/59361)
- [브라우저의 Reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
  - 브라우저의 relflow를 유발하는 요소들에 대한 설명



### 4강

- [파이썬 - CodeTags](https://www.python.org/dev/peps/pep-0350/#id22)
  - 주석을 달 때 TODO, FIXME, HACK 와 같은 키워드랑 같이 써서 전체검색해서 고치는 시간을 갖는 것도 좋다
- [비동기함수와 일반함수, 비동기 함수의 callback 시각화](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)