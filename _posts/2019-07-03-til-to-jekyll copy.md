---
layout: post
title:  "2019-07-03 today i learned"
date:   2019-07-04 20:51:00 +0700
categories: [oracle, html]
---


## 1. [Oracle]

<H5>제약조건 CONSTRAINTS</H5>


NOT NULL 
 -  컬럼 레벨에서만 제약조건 가능.
 -  NULL이 아닌 값

UNIQUE
 -  컬럼 레벨, 테이블 레벨에서 설정 가능.
 -  중복 아닌 값

PRIMARY KEY
 -  컬럼 레벨, 테이블 레벨에서 설정 가능.
 -  테이블에서 ROW를 구별하는 것.
 -  NOT NULL과 UNIQUE 제약이 있다고 봄.

FOREIGN KEY
 -  컬럼 레벨, 테이블 레벨에서 설정 가능.
 -  외부 테이블에 있는 값만 컬럼에 들어갈 수 있게 설정하는 것
 -  컬럼마다 여러개를 걸 수 있음.
 -  주의 사항 ** 참조키로 설정한 컬럼은 함부로 건들 수 없음.!!
 
CHECK 제약조건
 -  컬럼에 입력되거나 수정되는 값을 체크하여 설정된 값 이외의 값이면 에러
 -  비교연산자를 이용하여 조건 설정.
 -  CHECK 비교는 WHERE에 들어가는 모든 것들이 들어갈 수 있음. 
 -  예) 성별, 등급, 부서
`CREATE TABLE CHECKTEST(`<BR>
      `TEMP VARCHAR2(2) CHECK (TEMP NOT IN(5,5,4))
      );`


## 2. [HTML, CSS]

HTML 
<CODE>ANCHOR</CODE> 누르는 곳으로 보내줌 


CSS 기본 공부
 - ID는 하나만, CLASS는 중복 가능.









