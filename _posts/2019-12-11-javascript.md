---
layout: post
title: Javascript interview Preparation
---

#Javascript Scope





Q. 다음 자바스크립트가 어떻게 동작할지 서술하시오

마지막 값인 3이 세 번 출력됨.

```javascript
function f() {
    for ( var i = 0; i < 3; i++ ) {
        setTimeout( function() {
        console.log( i );
    }, 1000);
    }
}
f();
//출처: https://devzeroty.tistory.com/entry/개발자-신입-코딩-테스트-문제 [Dev Story..]
```

0, 1, 2가 1초간격으로 출력될 것 같지만 
자바스크립트의 함수는 변수 스코프는 특이함 
```var```라는 변수는 다른 언어들의 변수처럼 {}안에서만 실행되는 블록 스코프가 아니라 함수 스코프라서

> scope 란? 유효범위, 변수나 매개변수의 생존기간이나 접근성을 말함

```var i = 0```이라고 선언된 변수가 전역변수로 선언됨.


이걸 해결하려면

1. 전역변수인 ```var i=0``` 을 ```let i=0``` 으로 바꿔준다.
    - let이라는 변수는 블록스코프

```javascript
function f() {
    for ( let i = 0; i < 3; i++ ) {
        setTimeout( function() {
        console.log( i );
    }, 1000);
    }
}
f();
```

2. 즉시실행함수 사용하여 내부 스코프의 지역변수로 바꿔주기!

```javascript
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);
        }, 1000);
    })(i);
}
```

3. closures 
    - javascript의 꽃이라고 불리면서 최대강점이자 혼란스러운 개념

 >The closure is a function that accesses its lexical scope even executed outside of its lexical scope
 >접근하려고 하는 함수의 생명주기가 종료됬지만, 내부함수가 참조 하고 있어서 그 함수에 접근할 수 있는 함수

 참고 : https://dmitripavlutin.com/simple-explanation-of-javascript-closures/#:~:targetText=The%20closure%20is%20a%20function,where%20it%20is%20executed%20later.
 참고 : https://fullest-sway.me/blog/2017/11/13/js-closure/

 >Lexical scope : 어휘적 유효범위, 함수의 정의 시점에 변수를 참조하게 됨.
 > 