---
layout: post
title: javascript local storage
---

localStorage 은 사용자 로컬의 storage에 접근하게 해준다.

 - key 와 value 는 String으로 저장됨
 - 로컬에 넣어줄 때와 불러올 때 JSON으로 파싱해야함


```javascript

    //로컬 스토리지에 값을 넣어줄 때 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //로컬 스토리지에서 값을 가져올 떄 
    const parsedToDos = JSON.parse(loadedToDos);

```
