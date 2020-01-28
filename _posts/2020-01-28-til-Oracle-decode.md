---
layout: post
title: Oracle Decode 
---

회사에서 DB를 돌리고 마지막으로 테이블에 제대로 들어가는지 확인하기위해 
DECODE로 값을 확인하는데



```sql

--1. DECODE
SELECT DECODE(MYNAME, 'JEONGWON', 'O', 'X') AS 이름,
       DECODE(AGE, '20', 'O', 'X') AS 나이
FROM TABLE
WHERE ID = '001';

--2. CASE
SELECT CASE MYNAME WHEN 'JEONGWON' THEN 'O' ELSE 'X' AS 이름,
       CASE AGE WHEN '20' THEN 'O' ELSE 'X' AS 나이
FROM TABLE
WHERE ID = '001'; 



--1번 조회결과
--  이름   나이
--   O      X



--2번 조회결과
--  이름   나이
--   O      O


```
WHERE 로도 조회가 되고, CASE로도 되는데
이런식으로 DECODE함수를 이상하게 제대로 타지 못했다. 

결국 CASE로 해결을 하려고 했는데
과장님이 DECODE 컬럼값에 TRIM으로 공백을 제거해주면 된다고했다. 

```SQL

SELECT DECODE(MYNAME, 'JEONGWON', 'O', 'X') AS 이름,
       DECODE(TRIM(AGE), '20', 'O', 'X') AS 나이
FROM TABLE
WHERE ID = '001';

```


지금 다시 생각해보니까 AGE의 자료형이 CHAR로 되어있어서 나머지 값에 공백이 들어가서 공백을 없애야 조회가 되었던 것이다.

```sql
CREATE TABLE PEOPLE(
    ID CHAR(3) PRIMARYKEY,
    MYNAME VARCHAR(20),
    AGE CHAR(3)
);
```

근데 또 DECODE를 쓸 때 20에 '를 지우니까 되었었는데 왜일까,,




