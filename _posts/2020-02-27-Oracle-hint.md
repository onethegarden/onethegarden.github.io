---
layout: post
title: Oracle hint
---

쿼리 튜닝

##Oracle Optimizer 힌트

> Oracle Optimizer가 통계치에 따른 실행 계획을 세운다. 항상 최선일 수는 없어서 개발자가 
힌트절을 추가하여 실행계획을 세울 수 있도록 해준다.




**형식**

1. /*+ HINT*/
2. --+HINT


**특징**

 - SQL전체가 아닌 쓰여진 SQL블럭에만 적용







**종류(써본 것, 추가할 예정)**



 - INDEX(TABLE INDEX[INDEX])
 : 지정한 테이블의 인덱스 스캔을 실행


```sql

SELECT /*+ INDEX(A, EMPLOYEE)*/
   A.NAME
   A.AGE
FROM EMPLOYEE E
```





 - LEADING(TABLE)
 : 테이블 조인 시 순서를 정해줌


```sql
SELECT /*+ LEADING(B, A, C)*/
   A.NAME
   A.AGE
   B.LOCAL
   C.SALARY
FROM EMPLOYEE A, LOCAL B, SALARY C
WHERE A.LOCAL_NO=B.LOACAL_NO 
      AND A.EMP_NO=C.EMP_NO 

```




출처 : https://enxxstory.tistory.com/entry/Oracle-Oracle-Optimizer-%ED%9E%8C%ED%8A%B8-%ED%9E%8C%ED%8A%B8, 배운거