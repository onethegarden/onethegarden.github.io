---
layout: post
title: Type alias vs Interface


---

# Type alias vs Interface 



Typescript 를 사용하면서 Type이나 Interface를 통해 유형을 정의하여 사용하는데 통일할 필요가 있어서 정리한다.



### 1. 기본적인 사용법

기본적인 사용법을 먼저 보면 이해가 쉽다. 

Typescript의 버전이 업그레이드 될 때마다 내용이 바뀌므로 이 내용에 의지하는 것보다는 공식문서를 찾아보는게 훨씬 도움이 된다 ! 해당 내용은 2021년 8월 5일 기준이다



Type 과 Interface의 기본적인 쓰임은 같다. object를 만들 수 있고, class에서 구현 가능하며, 확장도 가능하다

```typescript
// 1. interface
interface User {
  name: string
  age: number
}

const user1: User = {
  name: 'jeongwon',
  age: 20,
}


// 2. type
type UserType = {
  name: string
  age: number
}

const user2: UserType = {
  name: 'archito',
  age: 5,
}
```





## 차이점

- Interface는 선언적 병합이 가능하다.  Type은 재 정의 불가능

  ```typescript
  // 1. 인터페이스
  interface Window {
    title: string
  }
  
  interface Window {
    ts: TypeScriptAPI
  }
  
  const src = 'const a = "Hello World"';
  window.ts.transpileModule(src, {});   
  
  
  // 2. Type
  type Window = {
    title: string
  }
  
  type Window = {
    ts: TypeScriptAPI
  }
   // Error: Duplicate identifier 'Window'.
  
  ```

- interface는 `extends` 로 확장, Type은 `&`로 확장

- interface는 객체에만 사용이 가능하다

  ```typescript
  interface AnObject1 {
      value: string
  }
  
  type AnObject2 = {
      value: string
  }
  
  // Using type we can create custom names
  // for existing primitives:
  type SanitizedString = string
  type EvenNumber = number
  
  // This isn't feasible with interfaces
  interface X extends string { //ERROR
  
  }
  ```

  





#### 🤔 그래서 뭐를 어디에 사용해야 하는 걸까?

공식문서와 dream coding 인터넷 강의를 각각 봐보자







## 1. 공식문서 



>For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. If you would like a heuristic, use `interface` until you need to use features from `type`.
>
>대부분의 경우, 개인 취향에 따라 선택할 수 있다. 타입스크립트는 다른종류의 선언이 필요한지 알려줄 것이다. 만약 휴리스틱(전통적인 방식)을 원한다면 interface를 쓰고 ```type``` 이 필요하면 그 때 그걸 써라~
>
>https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces





---



## 2. 드림코딩 



## interface

- 상호작용을 할 수 있게 도와주는 **규약사항** 

- 특정한 규격을 정의하는 거면 interface 를 사용하는게 낫다고 한다

  ```typescript
  interface CoffeMaker{
    coffeeBeans: number;
    makeCoffee: (shots: number) => Coffee;
  }
  class CoffeeMachine implements CoffeMaker{
    coffeeBeans: number;
    makeCoffee(shots: number){
      return{};
    }
  }
  ```

  



## Type

- 어떠한 데이터를 담을 목적으로 만들면 이걸 사용하면 된다.

  ```typescript
  interface Position{
  	x: number;
  	y: number;
  }
  const post : Position = {x: 0, y: 0};
  printPosition(pos);
  ```







---

# 📣 결론 



다른 커뮤니티들도 몇 개 살펴봤는데, interface는 개발자들 사이의 '약속'이라는 느낌이 강하다. 





### - 무언가 **약속 🤙 **이라는 느낌이 들 때는 interface를 사용하자

ex) API를 사용할 때, component의 파라미터로 어떤 값들을 넘길 때



#### - 정의 📝 라는 느낌이 들 때는 Type 을 사용하자

ex) 다국어 적용 시 언어의 종류를 정의할 때, 단순한 타입을 정의할 때 (크게 쓸 일이 없을 수도 있다)





### 예시 

Client Context에 들어가는 state에 대한 정의한 내용인데 좋은 예시가 될 것 같다!

```typescript

export type User = {
  userId: string;
  userName: string;
};

export type Language = 'en' | 'es' | 'ru' | 'ar' | 'ko';

export type Error = {
  status: number | null;
};

// 상태를 위한 인터페이스
interface ClientState {
  user: User; 
  language: Language;
  error: Error;
}
```















참고 

[DreamCoding](https://academy.dream-coding.com/courses/take/typescript)

[타입스크립트 공식문서](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

