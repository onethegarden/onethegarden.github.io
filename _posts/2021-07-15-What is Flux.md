---
layout: post
title: What is Flux
---



# What is Flux?

>내가 이해하기 위해 작성하는 Flux란 무엇인가

<br/><br/><br/><br/><br/><br/>

### 1. 등장 배경 - MVC의 한계

#### 유명하다는 facebook의 알림 버그

- Facebook에 로그인하면 메시지 아이콘 위에 알림이 표시된다.
-  그러나 메시지 아이콘을 클릭하면 새 메시지가 표시되지 않고 알림이 사라진다. 
- 그런 다음 몇 분 후에 사이트와 몇 번의 상호 작용이 끝나면 알림이 다시 표시된다. 메시지 아이콘을 다시 클릭하면… 여전히 새 메시지가 없다. 

<br/>

🙄jsp와 같은 서버사이드 랜더링으로 개발을 진행할 때 ajax로 부분적으로 화면을 재로딩하며 구현하면 충분히 ! 그리고 아주 많이 부딪힐 수 있는 문제들이다..

지금 회사의 소스들 중 어떤 부분은 그게 귀찮았는지 ajax로 데이터를 바꾸고 화면 전체를 재로드 한다 ( 🤐❔... )

<br/>

![image](https://user-images.githubusercontent.com/51187540/125787387-0fdf5cd3-59bf-46ea-85de-1b19efe66207.png)

이해를 돕기 위한 이미지이다. 

데이터를 주고 받는 과정이 연쇄적으로 발생하게 된다면, 또 비동기적으로 발생하게 되고, 하나의 데이터 요청이 또 다른 요청을 필요로 하게 된다면

이러한 데이터의 흐름은 디버그 하기가 어려워진다.

<br/><br/>

### 2. 그래서 단방향 데이터 흐름!

 📝페이스북은 이 문제의 이유를 **데이터 흐름**의 문제라고 보았다.

이미 구조는 복잡해져있고, 많은 Model과 View에서 이를 처리하다 보니 데이터 흐름의 싸이클이 꼬여버리기도 한다.

페이스북은 단기적인 해결책이 아닌 **시스템을 더욱 예측 가능하게 만들기 위해 <span style="color:red;">단방향 데이트 흐름 </span>**을 고안해 냈다고 한다 (구글이 개발한 angular를 쓰기 싫어서 더 고민했다는 이야기도 있다.....)

<br/><br/>

![image](https://user-images.githubusercontent.com/51187540/125788259-8dd056cf-6592-44c7-b4aa-a57d0608032c.png)



이러한 구조가 바로 Flux이다!

1. 데이터는 단방향으로만 흐르고
2. 새로운 데이터를 넣으면 처음부터 흐름이 다시 시작한다.

<br/><br/>

뭔가 알겠는데,, 그래서 어떻게 다르고 쟤네가 각자 하는 역할이 뭔데? 라는 생각이 든다.

이제 각각을 살펴보자

<br/><br/>

### 3. Flux 의 구성원들

#### 🙋‍♀️Action Creator

#### 🙋‍♀️Dispatcher

#### 🙋‍♀️Store

#### 🙋‍♀️View

<br/><br/>

### 4. 그래서 리덕스를 쓰는 방식?





참고 : 

카툰안내서 - 한국어 : https://bestalign.github.io/translation/cartoon-guide-to-flux/

​                     - 영어 : https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207

flux 공식문서 - https://facebook.github.io/flux/docs/in-depth-overview/

https://baeharam.netlify.app/posts/architecture/flux-redux