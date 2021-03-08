---

layout: post
title: vanillaJs infiniteScroll
---



## vanilla.js infiniteScroll 구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 무한스크롤에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>스크롤 페이징 구현
>
>검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 페이지를 로딩하도록 만들어야 합니다.







### 1. *IntersectionObserver*

> Intersection Observer API 는 그들이 감시하고자 하는 요소가 다른 요소(viewport)에 들어가거나 나갈때 또는 요청한 부분만큼 두 요소의 교차부분이 변경될 때 마다 실행될 콜백 함수를 등록할 수 있게 합니다.





- **intersection observer**의 생성

  ```javascript
  let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0 //threshold: 1.0 은 대상 요소가 root 에 지정된 요소 내에서 100% 보여질 때 콜백이 호출될 것을 의미
  }
  
  //observer 초기화, callback과 options을 가짐
  //callback은 entries, obeserver를 파라미터로 가짐
  const io = new IntersectionObserver((entries, observer) => {
      //관찰하여 실행할 내용
  }, options);
  
  //관찰할 대상 등록
  io.observe(element);
  ```



- entries : IntersectionObserverEntry 인스턴스의 배열

  - `boundingClientRect`: 관찰 대상의 사각형 정보
  - `intersectionRect`: 관찰 대상의 교차한 영역 정보
  - `intersectionRatio`: 관찰 대상의 교차한 영역 백분율(`intersectionRect` 영역에서 `boundingClientRect` 영역까지 비율, Number)
  - `isIntersecting`: 관찰 대상의 교차 상태(Boolean)
  - `rootBounds`: 지정한 루트 요소의 사각형 정보
  - `target`: 관찰 대상 요소
  - `time`: 변경이 발생한 시간 정보

  

- options

  - **root** : 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소 null 이거나 지정되지 않으면 기본값으로 설정
  - **rootMargin**: root가 가진 여백. css의 margin과 유사함. root 요소의 각 측면의 bounding box를 수축시키거나 증가시키며, 교차성을 계산하기 전에 적용. 기본값은 0 
  - **threshold** : observer 콜백이 실행될 대상 요소의 가시성 퍼센테이지. 만일 50%만큼 요소가 보여졌을 때를 탐지하고 싶다면, 값을 `0.5`로 설정







### 2. 구현한 것

```js
export const infiniteScroll = (nextFunction) => {
  const items = document.querySelectorAll('.item');
  const lastItem = items[items.length - 1];
  //console.log(lastItem);
  const io = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) {
      /*새로 할 일
        unobserve와 observe를 사용 안하는 이유는 state를 등록시킬 때마다 이 함수가 실행되기 때문에
        마지막 값이 재등록 됨
        */
      nextFunction();
    }
  });
  io.observe(lastItem);
};

```



- infiniteScroll 호출

```js
setState(nextData) { //스테이트가 설정될 때마다 infiniteScroll 실행
    this.data = nextData;
    this.render();
    infiniteScroll(this.onScroll);
  }
```



- onScroll함수

```js
this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (id) => {
        this.loading.setState({ isLoading: true });
        try {
          const response = await api.fetchCatDetail(id);

          if (!response.ok) {
            this.imageInfo.setState({
              image: response.data,
              visible: true,
            });
          }
        } catch (e) {
          console.log(e);
        }
        this.loading.setState({ isLoading: false });
      },
      onScroll: async () => { //onScroll 함수 파라미터로 넘겨줌
        this.loading.setState({ isLoading: true });
        try {
          const response = await api.randomCat();
          if (!response.ok) {
            let currData = this.data;
            currData.push(...response.data);
            this.setState(currData);
          }
        } catch (e) {
          console.log(e);
        }
        this.loading.setState({ isLoading: false });
      },
    });	
```

조회 결과의 마지막요소를 감시하여 root 요소 안에 들어왔을 때 파라미터로 넘겨준 함수를 실행하도록 하였다. 









- intersection Observer를 지원하지 않는 브라우저를 위해 라이브러리가 지원된다고 한다!
- ex) IE,,,
- https://github.com/w3c/IntersectionObserver/tree/main/polyfill





- 참고 
  - [intersection Observer - Mozilla](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
  - [intersection Observer - HEROPY Tech](https://heropy.blog/2019/10/27/intersection-observer/) 

