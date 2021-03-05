---
layout: post
title: vanillaJs search keywords
---



## vanilla.js searchKeywords구현 ##




- 프로그래머스 과제를 진행하면서 구현해 본 검색키워드에 대한 내용을 정리하려고 한다.
- [문제](https://programmers.co.kr/skill_check_assignments/4)



### 🌈 문제

>최근 검색한 키워드를 `SearchInput` 아래에 표시되도록 만들고, 해당 영역에 표시된 특정 키워드를 누르면 그 키워드로 검색이 일어나도록 만듭니다. 단, 가장 최근에 검색한 5개의 키워드만 노출되도록 합니다.





### 1. 검색한 키워드 저장

```js
searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
         //store는 배열, 배열에 추가
        const store = getLocalStore();
        store.push(e.target.value);
        //storageKey.SEARCH_HISTORY키 값으로 로컬스토리지에 저장
        setLocalStorage(storageKey.SEARCH_HISTORY, store); 
        this.onSearch(e.target.value);
        this.loadHistory();
      }
    });
```







### 2. 키워드 불러오기

```js
loadHistory = (e) => {
    const SearchHistoryArea = document.querySelector('.SearchHistory');
    ('');
    SearchHistoryArea.innerHTML = '';

    const searchHistory = getLocalStorage(storageKey.SEARCH_HISTORY);

    if (searchHistory) {
      let cnt = 0;
      let historyHtml = '';
      historyHtml += `<ul class="keywordList">`;
      for (let i = searchHistory.length - 1; i >= 0; i--) {
        if (cnt > 4) break;

        historyHtml += `<li class="keyword">${searchHistory[i]}</li>`;
        cnt++;
      }
      SearchHistoryArea.innerHTML += historyHtml;
    }
  };
```

1. 로컬스토리지에 저장한 데이터를 불러오고

2. 그 결과가 있을때만 history 영역에 결과를 붙여준다.

3. 최근 결과부터 5개 까지만 불러오도록 한다. 

   처음엔 for문의 조건에 ```i>4``` 라고 작성하려고 했지만 검색결과의 길이가 5 미만일 때도 있을 것이기 때문에 ```cnt```를 이용하였다. 