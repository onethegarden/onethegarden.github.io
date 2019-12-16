---
layout: post
title:  HTTP Status Codes
---





## * HTTP Status Codes : http 상태 코드



> ### **1xx : Information , 정보응답**



100 : continue

101 : Switching Protocol

102 : Processing 

- 처리중이지만 제대로된 응답을 알려줄 수 없음









> ### **2xx : Success , 성공응답**



200 :  ok

- 요청이 성공적으로 처리, Http 메소드에 따라 성공의미가 달라짐 









> ### **3xx : Redirection , 리다이렉션**



300 : Multiple Choice

- 요청에 대해 하나 이상의 응답이 가능









> ### **4xx : Client Error , 클라이언트 에러**



400 : Bad Request 

- 잘못된 문법으로 서버가 요청을 이해할 수 없음

  

404 : Not Fount

- 요청받은 리소스를 찾을 수 없음 , 알려지지 않은 url
- 가장 유명한 에러







> ### **5xx : Server Error , 서버에러**



500 : Internal Server Error

- 서버도 모르고 우리도 모르는 ㅇ ㅔ러,,운다,,
- The server encountered an unexpected condition that prevented it from fulfilling the request.



참고1 : https://developer.mozilla.org/ko/docs/Web/HTTP/Status

참고2 : https://httpstatuses.com/

