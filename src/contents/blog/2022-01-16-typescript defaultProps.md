---
layout: post
categories: ['typescript', 'React']
path: react-typescript-default-props
title: react typescript 에서의 defaultProps
---

## defaultProps를 typescript환경에서 쓸 때 문제가 좀 있어요

회사에서 `optional`한 값을 `parameter`로 받아서 구현한 컴포넌트가 있었는데, `defaultProps`로 구현을 하고 pr을 올렸다. 
> 🙋‍♂️ defaultProps를 typescript환경에서 쓸 때 문제가 좀 있어서요,
라는 리뷰를 받았었다. `React.FC`에서 `defaultProps`가 제대로 동작하지 않는다는 이슈는 알고 있었는데, `defaultProps`에 대한 이슈는 처음 들어봤다. 

그래서 해당 내용을 찾아보면서 `default parameter`로 변경을 했고, 이 내용에 대해 정리해보고자 한다.

<br/>
<br/>

**먼저, 처음에 올린 pr의 예시 : `defaultProps` 를 썼다.**

```javascript
interface Props {
  name?: string;
}

function Hello({ name }:Props){
  return(
    <div>hello {name}</div>
  )
}

Hello.defaultProps = {
    name: 'world
}

export default Hello;
```

<br/>


**리뷰 받고 변경한 내용 : `default parameter` 로 변경했다.**

```javascript
interface Props {
  name?: string;
}

function Hello({ name = 'world' }:Props){
  return(
    <div>hello {name}</div>
  )
}

export default Hello;
```

<br/>
<br/>

## react typescript 에서 defaultProps에 대한 논의


https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640

defaultProps에 대한 논의 - 2016년에 열려서 2019년에 닫혔다.꽤 오랬동안 진행됐던 걸로 보인다.

typescript3 에서 JSX에서 defaultProps를 지원한다고 하면서 닫혔다.


<br/>
<br/>

## typescript 3.0 부터 defaultProps를 지원한대요!

typescript 3.0에 jsx에서 defaultProps를 지원한다는 내용이 추가되었다.
[github - microsoft/typescript](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#support-for-defaultprops-in-jsx)

![image](https://user-images.githubusercontent.com/51187540/149651068-9edb2c7b-488c-4c19-9692-e6bf2a1b56fa.png)


<br/>
<br/>

## 앗, 그래도 여전히 남아있는 이슈
하지만, 여전히 문제가 있다. [react typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/)


> If your components Props interface extends another interface, defaultProps still doesn't work in TS3
> [링크](https://github.com/typescript-cheatsheets/react/issues/61)

다른 interface를 상속한 interface를 component의 props로 쓰면 여전히 defaultProps가 동작하지 않는다는 이슈가 있다고 한다. 

위 링크에 첨부되어 있는 예시코드에서 한 줄만 추가해서 돌려봤다.
`el_1` 의 경우 `defaultProps` 가 잘 동작하는 것을 볼 수 있었고, `el_2`의 경우 `GreetComponent`의 타입으로 props를 받았음에도 타입추론을 제대로 하지 못하는 것을 알 수 있다. 


![image](https://user-images.githubusercontent.com/51187540/149650437-e9b43393-9254-48a2-891a-77ae89c3a7a7.png)



<br/>
<br/>

## defaultProps deprecate 예정
defaultProps 도 함수형 컴포넌트에서 사용이 중단될 예정이라고 하니 기본 파라미터를 사용하자...
- [github - RFC](https://github.com/reactjs/rfcs/pull/107)
- [dan의 트윗](https://twitter.com/dan_abramov/status/1133878326358171650)

사실 tyepscript 문서에서도 함수형 컴포넌트에서는 default parameter를 사용하라고 한다. functional component에서 defaultProps는 권장되지 않는다고 한다...ㅎㅎ
![image](https://user-images.githubusercontent.com/51187540/149652205-6f2c0627-2bd0-4858-85e0-47e657133fdc.png)