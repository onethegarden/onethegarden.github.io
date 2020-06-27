---
layout: post
title: Oracle DATA CONVERSION 
---



## Oracle DATA CONVERSION ##



> Oracle Update 
>
> ST_SUBJECT 테이블의 SUB_NM 컬럼에 SUBJECT 테이블에 있는 SUB_NM값을 한 번에 넣어주기  데이터 이관
>
> 백업부터 확인까지



- ST_SUBJECT TABLE

  | NAME   | TYPE         |
  | ------ | ------------ |
  | ST_ID  | CHAR(7)      |
  | ST_NM  | VARCHAR(100) |
  | SUB_ID | CHAR(3)      |
  | SUB_NM | VARCHAR(100) |



- SUBJECT TABLE

  | NAME   | TYPE        |
  | ------ | ----------- |
  | SUB_ID | CHAR(3)     |
  | SUB_NM | VARCHAR(30) |
  | FIELD  | VARCHAR(30) |



------





**1. DATA BACKUP**


```sql

CREATE TABLE ST_SUB_20200627 AS
(
	SELECT * FROM ST_SUBJECT;
)
```



**2. COUNT , UPDATE**

 - UPDATE 할 테이블의 개수를 확인하고 UPDATE


```sql
--1. COUNT

SELECT COUNT(*)
FROM ST_SUBJECT A 
WHERE EXISTS
	(SELECT B.SUB_NM
     FROM SUBJECT B
     WHERE A.SUB_ID = B.SUB_ID
     AND B.SUB_NM IS NOT NULL
    );


--2. UPDATE

UPDATE ST_SUBJECT A
SET A.SUB_NM = 
	(SELECT B.SUB_NM
     FROM SUBJECT B
     WHERE A.SUB_ID = B.SUB_ID)
WHERE EXISTS
	(SELECT B.SUB_NM
     FROM SUBJECT B
     WHERE A.SUB_ID = B.SUB_ID
     AND B.SUB_NM IS NOT NULL
    );



--O , X로 확인

SELECT DECODE(A.A, '0', 'O', 'X') CONFIRM
FROM (SELECT COUNT(*) A FROM ST_SUBJECT WHERE SUB_NM IS NOT NULL) A;

--COUNT 개수와 UPDATE개수 같은지
-- OX확인 후 COMMIT

```


