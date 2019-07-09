---
layout: post
title:  "2019-07-08 today i learned"
date:   2019-07-09 12:03:00 +0700
categories: [oracle, css]
---


## 1. [Oracle]

<H5>PL/SQL</H5>

<P>
    오라클에서만 쓰는 언어<BR><BR>
    1. 선언부 DECLARE SECTION : 변수나 상수로 선언하는 부분<BR>
2. 실행부 EXECUTABLE SECTION : 제어문, 반복문, 함수 정의 등..BEGIN으로 시작<BR>
3. 예외처리부 EXCEPTION : 예외사항 발생
</p>



DECLARE

​    V_EMP_ID EMPLOYEE.EMP_ID%TYPE;--NUMBER

​    V_EMP_NAME EMPLOYEE.EMP_NAME%TYPE;--VARCHAR2

BEGIN

​    SELECT EMP_ID, EMP_NAME

​    INTO V_EMP_ID, V_EMP_NAME

​    FROM EMPLOYEE

​    WHERE EMP_NAME='유재식';

​    DBMS_OUTPUT.PUT_LINE(V_EMP_ID);

​    DBMS_OUTPUT.PUT_LINE(V_EMP_NAME);

END;

/

## 2. [CSS]

<H5>스타일적용</H5>

.class
#id

<H5>명시도</H5>

1. 인라인 스타일
2. id스타일
3. 클래스 스타일
4. 태그 스타일








