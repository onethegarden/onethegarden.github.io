---
layout: post
title: Spring Filter, Interceptor, aop
---


 
# Spring


![Different](https://justforchangesake.files.wordpress.com/2014/05/spring-request-lifecycle.jpg)

출처 : https://justforchangesake.wordpress.com/2014/05/07/spring-mvc-request-life-cycle/


**1. Filter**

    - Dispatcher Servlet 전에 실행
    - web.xml에 생성
    - ex) 보안, 인코딩




**2. Interceptor**

    - Dispatcher Servlet에서 Controller(Handler) 로 가기 전 처리
    - Spring이 자체적으로 제공, 따라서 dispatchersesrvlet이 읽는 설정파일에 설정
    - servlet-context.xml에 설정
    - ex) 로그인 체크, 권한체크, 로그확인



**3. Aop**

    - oop를 보안하기 위해 나온 개념
    - 로깅, 트랜잭션, 에러처리 등 비즈니스 단의 메서드에서 세밀하게 조정하기 위해 사용
    - 포인트 컷으로 메소드 전 후에 자유롭게 설정이 가능




    출처 : https://goddaehee.tistory.com/154






    ---
