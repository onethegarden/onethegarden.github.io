---
layout: post
title: vanillaJs responsive web
---



## vanilla.js 반응형 웹 구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 반응형 웹에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>1. 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 적절히 변경해주어야 합니다. 992px 이하: 3개 768px 이하: 2개 576px 이하: 1개
>
>2. 디바이스 가로 길이가 768px 이하인 경우, 모달의 가로 길이를 디바이스 가로 길이만큼 늘려야 합니다.





### 1. 미디어쿼리

- 기본 사용법

  ```css
  @media media-type and (media-feature-rule) {
    /* CSS rules go here */
  }
  ```





- media-feature-rule 미디어 기능 규칙

  - ```min-width```, ```max-width``` , ```width``` 등의 기능을 활용하여 css적용
  - ex) **```max-width```** 가 **400px보다 작은** 경우 body 색깔을 blue로 

  ```css
  @media screen and (max-width: 400px) {
      body {
          color: blue;
      }
  }
  ```

  - ```and```를 사용해 조건을 줄 수도 있음

  ```css
  @media screen and (min-height:640px) and (min-width:480px)
  ```







### 2. meta태그 - viewport

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

>예를 들어 모바일 화면의 너비가 640px 인 경우 페이지는 980px의 가상 뷰포트로 렌더링 된 다음 640px 공간에 맞게 축소됩니다. 
>
>https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag







### 3. 적용

```css

.SearchResult {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-gap: 10px;
}

@media screen and (max-width: 992px) {
  .SearchResult {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
  }
}
@media screen and (max-width: 768px) {
  .SearchResult {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}
@media screen and (max-width: 576px) {
  .SearchResult {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
}
```





