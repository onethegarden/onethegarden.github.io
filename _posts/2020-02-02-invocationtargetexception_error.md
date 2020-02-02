---
layout: post
title: Java invocationtargetexception
---


struts
java.lang.reflect.invocationtargetexception 오류



1. xconf 파일에 명명규칙에 맞는 지 확인

예) 
<prop key = "create*"> 과 같은 거 확인


2. 반환값이 null이 아닌지 확인 
null일 때 예외처리를 해주면 해결 됨