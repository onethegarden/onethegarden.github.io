---
layout: post
title: vanillaJs loading
---



## vanilla.js loading 화면 구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 로딩에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>필수 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 유저에게 알리는 UI를 추가해야 합니다. 



### 1. 로딩 컴포넌트

```javascript
export default class Loading {
  constructor({ $target, data }) {
    this.$loadingArea = document.createElement('div');
    this.$loadingArea.className = 'loading';

    $target.appendChild(this.$loadingArea);
    this.data = data;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const loading = document.querySelector('.loading');
    if (this.data.isLoading) {
      loading.innerHTML = `
      <div class="loadingDiv">
        <img class="loadingImage" class="" src="https://media.giphy.com/media/Qrca6tBIdqXYXhnB4v/giphy.gif" />  
      </div>
      `;
    } else {
      loading.innerHTML = '';
    }
  }
}

```





### 2. 로딩 컴포넌트 호출

```javascript
this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.setState({ isLoading: true });
        try {
          const response = await api.fetchCats(keyword);
          if (!response.ok) {
            if (response.data.length == 0) {
              this.setState('nothing');
            } else {
              setLocalStorage(storageKey.LAST_SEARCH, response.data);
              this.setState(response.data);
            }
          }
        } catch (e) {
          console.log(e);
        }
        this.loading.setState({ isLoading: false });
      },
      onRandom: async () => {
        this.loading.setState({ isLoading: true });
        try {
          const response = await api.randomCat();
          if (!response.ok) {
            setLocalStorage(storageKey.LAST_SEARCH, response.data);
            this.setState(response.data);
          }
        } catch (e) {
          console.log(e);
        }
        this.loading.setState({ isLoading: false });
      },
    });

this.loading = new Loading({
      $target,
      data: {
        isLoading: true,
      },
    });
```

- 파라미터로 ```isLoading```에 대한 상태를 넘겨 주고 그 상태에 따라 렌더링 하도록 하였다.



###  style.css 

```css

.loading {
  height: 100%;
  width: 100%;
}

.loading .loadingDiv {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.loadingImage {
  width: 10em;
  border-radius: 5em;
}
```






