---
layout: post
title: vanillaJs multi image slide
---



## vanilla.js multi image slide 구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 이미지 슬라이드에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>### 랜덤 고양이 배너 섹션 추가
>
>- 현재 검색 결과 목록 위에 배너 형태의 랜덤 고양이 섹션을 추가합니다.
>- 앱이 구동될 때 `/api/cats/random50` api를 요청하여 받는 결과를 별도의 섹션에 노출합니다.
>- 검색 결과가 많더라도 화면에 5개만 노출하며 각 이미지는 좌, 우 슬라이드 이동 버튼을 갖습니다.
>- 좌, 우 버튼을 클릭하면, 현재 노출된 이미지는 사라지고 이전 또는 다음 이미지를 보여줍니다.(트렌지션은 선택)



- 3개인줄 알고 구현을 하고 보니 문제에서 요구한 화면에 노출되는 사진이 5개 였다.

  3개를 기준으로 포스트를 작성한다.



### 1. 슬라이드 html

```html
	<div class="display-area">
      <div class="cards-wrapper">
        ${
          this.$data &&
          this.$data
            .map((cat) => {
              return `<div class="card"><img src="${cat.url}" alt="고양이"></div>`;
            })
            .join('')
        }
      </div> 
    </div>
    <div class="dots-wrapper">
      <button class="dot" id="left"> < </button>
      <button class="dot" id="right"> > </button>
    </div>
```





### 2. 슬라이드 CSS, 영역 계산 방법

```css

/*이미지 슬라이드*/
.card {
  height: 150px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 40px;
  margin: 10px;
  flex: 250px 0 0;
  overflow: hidden;
}

@media screen and (max-width: 576px) {
  .card {
    height: 60px;
    margin: 5px;
    flex: 90px 0 0;
  }
}

.card img {
  object-fit: cover;
  max-width: 100%;
}

.cards-wrapper {
  display: flex;
  transition: ease 0.5s;
}

.display-area {
  width: 810px;
  /*   border: 1px solid black; */
  overflow-x: hidden;
  margin: auto;
}

@media screen and (max-width: 576px) {
  .display-area {
    width: 300px;
  }
}
```



![캡처](https://user-images.githubusercontent.com/51187540/110073008-08d16480-7dc2-11eb-94d1-de65ac0008f2.PNG)

- 여기 이 파란색이 display-area 영역이고 쭉 나열되어 있는 고양이 사진 중에서 810px 의 영역만 보여준다.

- 이 영역을 계산하는 방법은

  - ```(사진의 넓이) * 3 + (사진의 margin)*3*2``` 이다.

  - 내가 만든 고양이 사진이의 넓이가 ```250px```이고 ```margin```이 ```10px```이므로 

    ```250px * 3 + 10px * 3 * 2 = 810px```이다.











### 3. 슬라이드 JS, 움직일 영역 계산하는 방법

```js
//생성자에서 $currSlide 현재의 위치 설정
constructor({ $target, onLoad }) {
    ...
	this.$currSlide = 0; //슬라이드 현재 위치
}

slide = (e) => {
    if (e.target.className !== 'dot') return;

    const wrapper = document.querySelector('.cards-wrapper');
    const displayArea = wrapper.parentElement.clientWidth;

    if (this.$currSlide === 0 && e.target.id === 'left') return;

    const navi = e.target.id == 'right' ? -1 : +1;

    this.$currSlide = this.$currSlide + navi;

    const pixels = displayArea * this.$currSlide;

    wrapper.style.transform = 'translateX(' + pixels + 'px)';
  };

```

슬라이드가  움직이는 거처럼 보이기 위해서는 cards-wrapper가 움직여야 한다.

오른쪽으로 가는 것 같이 보여려면 왼쪽으로 ```-```, 왼쪽으로 가는 것 같이 보이려면 오른쪽으로 ```+``` 움직여야한다. 또한 한 번에 다음 페이지로 넘어가는 것 처럼 보이려면 보이는 영역의 넓이만큼 움직여야한다.



1.  보이는 부분의 넓이를 가져온다. 

   ```js
   const wrapper = document.querySelector('.cards-wrapper');
   const displayArea = wrapper.parentElement.clientWidth;
   ```





1. 버튼 방향에 따라 부호를 설정해준다.

   이 때, 현재의 위치가 0 (첫 페이지) 이고 왼쪽 버튼을 눌렀을 때는 결과 값이 없기 때문에 리턴해준다.

   ```js
   if (this.$currSlide === 0 && e.target.id === 'left') return;
   
   const navi = e.target.id == 'right' ? -1 : +1;
   ```





1. 현재 위치를 설정하여 ```보이는 넓이 * 현재위치에 더하거나 뺀 값```으로 움직일 pixel을 계산하고

   wrapper에 ```translateX```속성을 추가하여 움직이게 한다.

    

   ex) right 버튼을 두 번 눌렀을 때 = currslide가 -2 이고, displayarea가 810이므로 -1620만큼 움직이게 된다. 

   ```js
   this.$currSlide = this.$currSlide + navi;
   
   const pixels = displayArea * this.$currSlide;
   
   wrapper.style.transform = 'translateX(' + pixels + 'px)';
   ```

   







### 고양이 섹션 컴포넌트

```js
export default class CatSection {
  constructor({ $target, onLoad }) {
    this.$target = $target;
    this.onLoad = onLoad;
    this.$data = '';
    this.$slideSection = document.createElement('div');
    this.$slideSection.className = 'slideSection';
    this.$target.appendChild(this.$slideSection);

    this.$currSlide = 0; //슬라이드 현재 위치
    this.onLoad();
  }

  setState(nextData) {
    this.$data = nextData;
    this.render();
  }

  slide = (e) => {
    if (e.target.className !== 'dot') return;

    const wrapper = document.querySelector('.cards-wrapper');
    const displayArea = wrapper.parentElement.clientWidth;

    if (this.$currSlide === 0 && e.target.id === 'left') return;

    const navi = e.target.id == 'right' ? -1 : +1;

    this.$currSlide = this.$currSlide + navi;

    const pixels = displayArea * this.$currSlide;

    wrapper.style.transform = 'translateX(' + pixels + 'px)';
  };

  render() {
    //this.$randomSection.appendChild();
    const html = `
    <div class="display-area">
      <div class="cards-wrapper">
        ${
          this.$data &&
          this.$data
            .map((cat) => {
              return `<div class="card"><img src="${cat.url}" alt="고양이"></div>`;
            })
            .join('')
        }
      </div> 
    </div>
    <div class="dots-wrapper">
      <button class="dot" id="left"> < </button>
      <button class="dot" id="right"> > </button>
    </div>
    `;
    this.$slideSection.innerHTML += html;

    const wrapper = document.querySelector('.slideSection');
    wrapper.addEventListener('click', this.slide);
  }
}

```





