---
layout: post
title: Oracle subquery
---

##ORACLE SubQuery 연습


*최소값을 가진 데이터의 이름을 조회하고 싶을 때

1. where 절에 서브쿼리 사용

```Sql

SELECT NAME 
FROM ANIMAL_INS
WHERE DATETIME =(SELECT MIN(DATETIME)FROM ANIMAL_INS)

```


2. rownum사용
```sql
SELECT NAME 
FROM ANIMAL_INS
    (SELECT NAME 
     FROM ANIMAL_INS
     ORDER BY DATETIME
     )
WHERE ROWNUM=1
```





* 두 테이블에 겹치지 않는 값 조회

1. NOT IN

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_OUTS
WHERE ANIMAL_ID NOT IN 
     (SELECT ANIMAL_ID 
      FROM ANIMAL_INS) 
```



2. NOT EXISTS

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_OUTS
WHERE ANIMAL_ID NOT EXISTS 
     (SELECT ANIMAL_ID 
      FROM ANIMAL_INS) 
```

3. Minus

```Sql
SELECT ANIMAL_ID,NAME
FROM ANIMAL_OUTS
MINUS
SELECT ANIMAL_ID,NAME
FROM ANIMAL_INS
```




*** IN과  EXISTS 차이
Exists는 해당 row가 존재하는지 확인, in은 값까지 비교해서 확인






* ROWNUM

- 입양을 가지 못한 동물 중 가장 오래된 동물 3마리


'''sql

SELECT NAME, DATETIME
FROM (SELECT *
    FROM ANIMAL_INS
    ORDER BY DATETIME)
WHERE ANIMAL_ID NOT IN 
    (SELECT ANIMAL_ID
    FROM ANIMAL_OUTS)
AND ROWNUM<=3

'''

- not in 으로 입양을 간 동물에 해당하지 않는 조건을 걸고
 From 에 서브쿼리로 시간별로 정렬을 해서 rownum으로 상위 3개 출력







