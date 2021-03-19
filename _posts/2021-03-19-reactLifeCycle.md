---
layout: post
title: React LIfecycle of Component
---



## React LIfecycle of Component

>리액트 컴포넌트의 라이프 사이클에 대한 글
>
>현재는 클래스형을 많이 사용하지는 않는다고 하지만 그래도 알고 있어야 될 것 같아 정리한다.



##### 먼저 클래스형과 함수형의 차이부터 알아보자!

- 클래스형

```react
import React, {Component} from 'react';

class App extends Component { //클래스로 선언하고 Component를 상속받아 사용해야 한다.
  render() { //렌더 메소드가 반드시 필요하다.
    const name = 'react';
    return <div className="react">{name}</div>
  }
}

export default App;
```

- 함수형

```react
import React from 'react';
import './App.css';

function App() {
  const name = 'react';
  return <div className = "react">{name}</div>
}

export default App;
```



- 차이 

| 클래스형                                                     | 함수형                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| state, lifeCycle 관련 기능 사용 가능                         | state, lifeCycle 관련기능 사용 못했다.(hook으로 해결)        |
| 메모리를 함수형보다는 더 씀                                  | 메모리를 클래스형보다 덜 씀                                  |
| 임의 메서드 정의 가능                                        | 컴포넌트 선언이 편함                                         |
| Stateful 컴포넌트 : 로직과 상태를 컴포넌트 내에서 구현, 상대적으로 복잡한 UI | Stateless 컴포넌트 :  state를 사용하지 않고 단순하게 데이터(props)를 받아서 UI에 뿌려줌 |



- 클래스형 컴포넌트 예제

```react
import React, { Component } from 'react';

class Counter extends Component {
    //클래스형 컴포넌트에서는 클래스 내의 constructor 메서드에서 state의 초기값을 설정해줘야 함.
  constructor(props) {
    super(props); //반드시 호출해줘야 함
    this.state = {
      number: 0
    };
  }
  render() {
    const { number } = this.state; // state 를 조회할 때에는 this.state 로 조회합니다.
    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick 을 통하여 버튼이 클릭됐을 때 호출 할 함수를 지정합니다.
          onClick={() => {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
```





### 리액트 컴포넌트 라이프사이클 

- 라이프사이클은 크게 세 부분으로 나뉘어진다. (마운트, 업데이트 , 언마운트)

- 마운트 : DOM이 생성되고 웹 브라우저 상에 나타나는 것
- 업데이트 : 컴포넌트가 업데이트 되는 경우는 네가지
  - props가 바뀔 때
  - state가 바뀔 때
  - 부모 컴포넌트가 리렌더링 될 때
  - this.forceUpdate로 강제로 렌더링을 트리거 할 때
- 언마운트



![image](https://i.imgur.com/cNfpEph.png)

출처: http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/



#### 요약 







#### 1. 마운트

```react
/*
*    1. constructor
*    2. getDerivedStateFromProps
*    3. render
*    4. componentDidMount
*/


/*
*	1. constructor : 컴포넌트의 생성자 메서드, 컴포넌트가 만들어질 때 가장먼저 실행
*	리액트에서 생성자의 역할은 다음 두 가지가 있다.
*        - this.state에 객체를 할당하여 지역 state를 초기화
*        - 인스턴스에 이벤트 처리 메서드를 바인딩
*/
constructor(props){
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
}


/* 
* 	2. getDerivedStateFromProps : props로 받아온 것을 state에 넣어주고 싶을 때 사용
* 	다른 생명주기 메서드와는 달리 static을 필요로 하고, 이 안에서는 this를 조회 할 수 없음
* 	컴포넌트가 처음 렌더링 되기 전에 호출되고, 그 이후 리렌더링 되기 전에 매번 실행 됨.
* 	마운트 후에 다룰 업데이트에서도 props나 state가 바뀌면 이 함수가 실행 됨.
*/
static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    //여기서 특정 객체를 반환하게 되면, 해당 객체 안에 있는 내용들이 컴포넌트의 state로 설정 됨.
    //null로 반환 시 아무일도 안일어남
    return null;
  }



//3. render : 컴포넌트를 렌더링 하는 메서드
 render() { 
    const name = 'react';
    return <div className="react">{name}</div>
  }



/*
*	4. componentDidMount : 컴포넌트의 첫번째 렌더링이 마치고 나면 호출되는 메서드
*	이 메서드가 호출되는 시점에는 우리가 만든 컴포넌트가 화면에 나타나는 상태
*	DOM을 사용해야하는 외부 라이브러리 연동을 하거나, axios, fetch 등을 통하여 요청하거나
*	DOM의 속성을 읽거나 직접 변경
*/
```









#### 2. 업데이트

```react
/*
*    getDerivedStateFromProps
*    shouldComponentUpdate
*    render
*    getSnapshotBeforeUpdate
*    componentDidUpdate
*/

/*
*	1. getDerivedStateFromProps :  props 나 state 가 바뀌었을때도 이 메서드가 호출된다.
*/

/*
*	2. shouldComponentUpdate : 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드
*	주로 최적화할 때 많이 사용한다고 한다.
*/
shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다
    return nextState.number % 10 !== 4;
  }


/*
*	3. render 생략
*/


/*
*	4. getSnapshotBeforeUpdate : 컴포넌트에 변화가 일어나기 직전의 DOM의 상태를 가져와서
*	특정 값을 반환하면 그 다음 발생하는 componentDidUpdate 함수에서 받아와서 사용을 할 수 있다.
*/
 getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
     //반환한 값으로 그 다음 발생하는 componentDidUpdate 함수에서 받아와서 사용을 할 수 있다.
    return null;
  }


/*
*	5. componentDidUpdate : 리렌더링이 마치고, 화면에 우리가 원하는 변화가 
*	모두 반영되고 난 뒤 호출되는 메서드
*	세 번째 파라미터로 4번의 getSnapshotBeforeUpdate에서 반환한 값을 조회할 수 있다.
*/

componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트 되기 직전 색상: ", snapshot);
    }
  }
```

- https://codesandbox.io/s/getsnapshotbeforeupdate-yeje-vpmle?fontsize=14&file=/src/ScrollBox.js:1293-1296 - 사용사례 참고 (스크롤 위치 유지하기)





#### 3. 업데이트

```react
// componentWillUnmount : 컴포넌트가 화면에서 사라지기 전에 호출
// DOM에 직접 등록했었던 이벤트 제거, setTimeout과 같은 것이 있으면 clearTimeout을 통하여 제거
 componentWillUnmount() {
    console.log("componentWillUnmount");
  }
```







 📕리액트 문서의 Hook Motivation 📕



>### Class은 사람과 기계를 혼동시킵니다.
>
>Class가 코드의 재사용성과 코드 구성을 좀 더 어렵게 만들 뿐만 아니라, React를 배우는데 큰 진입장벽이라는 것을 알게 되었습니다. Javascript에서 어떻게 `this`가 작동하는지 알아야만 했고, 대부분의 다른 언어와는 다르게 작동합니다. 이벤트 핸들러가 등록되는 방법을 기억해야만 합니다. 불안정한 [문법 제안들](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)이 없다면, 코드는 매우 장황해집니다. 사람들은 props, state, 그리고 top-down 데이터 흐름을 완벽하게 이해할 수 있지만, 여전히 Class는 쉽지 않습니다. React 안에서의 함수와 Class 컴포넌트들을 구별하고 각 요소를 언제 사용하는지는 숙련된 React 개발자 사이에서도 의견이 일치하지 않습니다.

>이러한 문제를 해결하기 위해, **Hook은 Class없이 React 기능들을 사용하는 방법을 알려줍니다.** 개념적으로 React 컴포넌트는 항상 함수에 더 가깝습니다. Hook은 React의 정신을 희생하지 않고 함수를 받아들입니다. Hook은 명령형 코드로 해결책을 찾을 수 있게 해주며 복잡한 함수형 또는 반응형 프로그래밍 기술을 배우도록 요구하지 않습니다.





### 그래서 나온게 Hook!

- ```this.state``` -> ```useState ``` 
- ```componentDidMount```, ```componentDidUpdate```, ```componentWillUnmount``` -> ```useEffect```





- 출처 

  - 누구든지 하는 리액트 -  https://velopert.com/3631
  - 모던리액트 - https://react.vlpt.us/basic/25-lifecycle.html
  - https://ko.reactjs.org/docs/hooks-overview.html

  
