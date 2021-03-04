---
layout: post
title: vanillaJs darkMode
---



## vanilla.js darkMode구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 다크모드에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>다크 모드(Dark mode)를 지원하도록 CSS를 수정해야 합니다.
>
>CSS 파일 내의 다크 모드 관련 주석을 제거한 뒤 구현합니다. 모든 글자 색상은 #FFFFFF , 배경 색상은 #000000 로 한정합니다. 기본적으로는 OS의 다크모드의 활성화 여부를 기반으로 동작하게 하되, 유저가 테마를 토글링 할 수 있도록 좌측 상단에 해당 기능을 토글하는 체크박스를 만듭니다.



### 1. 사용자 지정 속성

> CSS 저작자가 정의하는 개체, 문서 전반적으로 **재사용할 임의의 값**을 담음.
>
> ```--main-color: black;```과 같이 정의하고 ```var(--main-color)``` 함수를 통해 접근할 수 있음.



###  style.css 

```css
/*전역변수 설정*/
:root[color-theme='light'] {
  --background: #fff;
  --color: #000;
}
:root[color-theme='dark'] {
  --background: #000;
  --color: #fff;
}

/*사용예시*/
.ImageInfo .content-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  border: 1px solid var(--color);
  border-radius: 5px;
}
```

- ```<html lang="en" color-theme="dark">```  이런식으로 html 값의 ```color-theme``` 값에 따라 배경색과 글 색을 변경하도록 하였다.







### 2. javascript에 사용자 지정 속성 적용하기

```javascript
export default class DarkModeToggle {
  constructor({ $target }) {
    this.$target = $target;
	
    //1. 현재 os의 상태가 다크모드인지 가져오기
    this.$currMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches == true
        ? 'dark'
        : 'light';
    this.render();
    this.setDarkMode();
  }

    //2.초기 상태에 따라 다크모드 CSS 적용, 체크박스에 체크하는 함수
  setDarkMode() {
    document.documentElement.setAttribute('color-theme', this.$currMode);

    const checkBox = document.querySelector('.darkCheckbox');
    checkBox.checked = this.$currMode == 'dark' ? true : '';
  }
	//체크박스 체크에 따른 CSS 다크모드 변경
  toggleDarkMode = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('color-theme', 'dark');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
    }
  };

  render() {
    const darkDiv = document.createElement('div');
    darkDiv.className = 'darkDiv';

    const darkModeCheckBox = document.createElement('input');
    darkModeCheckBox.type = 'checkbox';
    darkModeCheckBox.className = 'darkCheckbox';

    const darkModeLabel = document.createElement('label');
    darkModeLabel.innerText = 'darkMode';
    darkModeLabel.className = 'darkModeLabel';

    darkModeLabel.appendChild(darkModeCheckBox);
    darkDiv.appendChild(darkModeLabel);
    this.$target.appendChild(darkDiv);
	
      //체크박스 클릭에 따른 이벤트 설정
    darkModeCheckBox.addEventListener('click', this.toggleDarkMode);
  }
}

```





- ```document.documentElement ```란?
  - XML문서의 documentElement는 해당 문서의 루트요소, 항상 ```<html>```



- prefers-color-scheme 미디어 속성

  - **`prefers-color-scheme`**  미디어 특성은 사용자의 시스템이 라이트 테마나 다크 테마를 사용하는지 탐지하는 데에 사용
  - css에 미디어 쿼리로 해서 사용할 수 있고

  ```
  .themed {
    display: block;
    width: 10em;
    height: 10em;
    background: black;
    color: white;
  }
  
  @media (prefers-color-scheme: light) {
    .themed {
      background: white;
      color: black;
    }
  }
  ```

  - javascript에서는 ```window.matchMedia```를 사용해서 상태를 확인할 수 있다.

  ```javascript
  if (window.matchMedia('(prefers-color-scheme: dark)').matches == true) {
    console.log('🎉 Dark mode!!');
  }
  ```







- 참고

  [사용자 지정 CSS속성](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)

  [prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)