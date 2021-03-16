---
layout: post
title: javascript this
---



## Javascript this! ##




- javascript 의 this에 대해 정리하고자 한다

- 일단 javascript의 this는 다른언어와 조금 다르고, 엄격모드에 비엄격 모드에도 일부 차이가 있다.

  ```javascript
  //엄격모드
  console.log(this); //window
  //비엄격모드
  console.log(this); //undefined
  ```

- 실행하는 환경에 따라 다르다.

  ```javascript
  //웹브라우저
  console.log(this); //window
  //node
  console.log(this); //global
  ```

  

- 객체의 메서드로서의 this

```javascript
    var value = 100;
    var myObj = {
      value: 1,
      func1: function () {
        //myobj가 this로 바인딩 - 객체의 메서드를 호출하는 것
        console.log(`func1 this.value: ${this.value}`);

        //함수 호출 시 함수는 전역에 바인딩 된다.★
        function innerRegular() {
          console.log(`inner regular this.value : ${this.value}`);
        }

        innerRegular();

        const innerFunctional = () => {
          console.log(`inner functional this.value : ${this.value}`);
        };

        innerFunctional();
      },
    };

    myObj.func1();
    // func1 this.value: 1
    // inner regular this.value : 100
    // inner functional this.value : 1
```

- ★표와 같이 서브루틴 내에세 바깥의 this를 사용하려고 할 때는 arrow function을 사용하면 해결 할 수 있다.