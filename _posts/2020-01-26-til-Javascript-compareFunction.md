---
layout: post
title: Til Javascript CompareFunction
---

 Compare Function
====================


자바스크립트의 sort함수에 대한 내용.


 ```javascript
	
	var arr = [2,1,10,20,3];
	arr.sort();
	console.log(arr);

```

	**result :[1,10,2,20,3]**





	sort함수는 문자비교함수이기 때문에 10과 2를 비교했을 때 10을 더 작은 값으로 정렬한다.

	그래서 sort안에 비교하는 함수를 넣어주면 해결을 할 수 있음

 


 ```javascript
	
	var arr = [2,1,10,20,3];
	arr.sort(function(a,b){return a-b;});
	console.log(arr);

```
  매개변수로 전달받은 a와 b를 연산한 값을 정렬하기 때문이다.
  return 값이 a-b 이면 오름차순, b-a 면 내림차순! 




Taken from [생활코딩](https://www.opentutorials.org/course/50/109)

