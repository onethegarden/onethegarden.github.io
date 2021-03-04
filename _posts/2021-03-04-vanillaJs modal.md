---
layout: post
title: vanillaJs modal
---



## vanilla.js modal구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 모달에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>이미지 상세 보기 모달 관련
>
>1. 디바이스 가로 길이가 768px 이하인 경우, 모달의 가로 길이를 디바이스 가로 길이만큼 늘려야 합니다. 
>
>2. 필수 이미지를 검색한 후 결과로 주어진 이미지를 클릭하면 모달이 뜨는데, 모달 영역 밖을 누르거나 / 키보드의 ESC 키를 누르거나 / 모달 우측의 닫기(x) 버튼을 누르면 닫히도록 수정해야 합니다. 
>
>3. 모달에서 고양이의 성격, 태생 정보를 렌더링합니다. 해당 정보는 /cats/:id 를 통해 불러와야 합니다. 



### 1. ImageInfo 컴포넌트(모달)

```javascript
export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  closeModal = (e) => {
    if (
      e.keyCode !== 27 &&
      e.target.className !== 'ImageInfo' &&
      e.target.className !== 'close'
    )
      return;
    const ImageInfo = document.querySelector('.ImageInfo');
    ImageInfo.style.display = 'none';
  };

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = 'block';

      this.$imageInfo.addEventListener('click', this.closeModal);
      window.addEventListener('keyup', this.closeModal);
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}

```

- 이벤트 위임을 통해 ```className```과 ```keyCode```를 확인해서  특정 값이 아니면 ```return```하도록 하였다.

   ```javascript
  if (
        e.keyCode !== 27 &&
        e.target.className !== 'ImageInfo' &&
        e.target.className !== 'close'
      ) return;
   ```

  

### 2. 모달 호출

```javascript
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
      onScroll: async () => {
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

- 파라미터로 ```onClick```함수를 넘겨준다. 클릭 시 해당 고양이의 id로 정보를 가지고 오게 하였다.





### 3. 반응형css

```css

.ImageInfo .content-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  border: 1px solid var(--color);
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .ImageInfo .content-wrapper {
    width: 100%;
  }
}
```

