---
layout: post
title: IE Console Error
---

## IE Console Error Debug ##



어쩔 수 없이 Internet Explorer를 사용해야 하는 경우(프로젝트가 너무 구식이라 호환이 안되는,,심지어 문서모드 5,,,정말 말도 못 할 구림이다.  )
console을 찍을 때 개발자 도구를 켜놓지 않으면 에러가 나는데



해결법은 ,,ㅎ 없을 때 안찍는 것,,,


```javascript
if(typeof console != 'undefined'){ console.log("콘솔찍기");}

```
