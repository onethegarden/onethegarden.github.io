---
layout: post
title:  "TIL-2019-06-28"
date:   2019-06-28 21:44:00 +0700
categories: [oracle]
---



2019-06-28**

​     

​     

함수

 

단일행 함수 : 특정 데이터를 해당 형식에 맞게 변환하는 함수

​     

형변환 함수들, to_char(), to_date(), to_number()

​     

​     

to_char ()

 숫자데이터 형식:

  0/9/천단위쉼표/통화기호

 날짜 데이터 형식:

  YYYY-MM-DD DAY(요일) Q(분기)

HH:MI:SS

to_date

SELECT TO_CHAR(TO_DATE(‘70’,‘YY’),‘YYYY’),

​    TO_CHAR(TO_DATE(‘70’,‘RR’),‘RRRR’)

  FROM EMPLOYEE;

​     

선택함수

DECODE(), CASE

 

예)

 `SELECT EMP_NAME,`

​       `DECODE(SUBSTR(EMP_NO,8,1),1,'남성',2,'여성') "성별"`

​       `FROM EMPLOYEE;`

​     

`SELECT EMP_NAME,`

​       `CASE`

​         `WHEN SUBSTR(EMP_NO,9,1)=1 THEN '남성'`

​         `WHEN SUBSTR(EMP_NO,9,1)=1 THEN '여성'`

​         `END`

​         `성별`

`FROM EMPLOYEE;`

``     

​     

그룹함수

SUM(), AVG(), MAX(), MIN(), COUNT()

​     

GROUP BY 절

조회한 결과들을 특정 소그룹으로 묶어 결과를 출력하는 구문

​     

예) 성별조회

`SELECT DECODE(SUBSTR(EMP_NO,8,1),1,'남성',2,'여성') "성별",`

​       `COUNT(*) 수`

`     FROM EMPLOYEE`

`GROUP BY (SUBSTR(EMP_NO,8,1));`

​     

HAVING

소그룹으로 묶은 그룹 별 조건

​     

`SELECT DEPT_CODE, SUM(SALARY)`

`FROM EMPLOYEE`

`GROUP BY DEPT_CODE`

`HAVING SUM(SALARY)>=9000000;`

``         

​     

ROLLUP, CUBE 그룹별 집계를 조회하는 함수

특정 그룹에 대한 집계 및 자동 총 집계를 계산해주는 함수

​     

`select dept_code, job_code, sum(salary),` 

​       `grouping(dept_code)"부서별 자동집계여부",`

​       `grouping(job_code)"직급별 자동집계여부"`

`from employee`

`group by rollup(dept_code, job_code)`

`order by 1, 2;`

​     

`select dept_code, job_code, sum(salary),` 

​       `grouping(dept_code)"부서별 자동집계여부",`

​       `grouping(job_code)"직급별 자동집계여부"`

`from employee`

`group by cube(dept_code, job_code)`

`order by 1, 2;`

​     

자동집계 여부에 따라 0과 1로 나누어 구분해주는 함수

`select dept_code, job_code, sum(salary),` 

​      `case`

​         `when grouping(dept_code)=0` 

​           `and grouping(job_code)=1`

​         `then '부서별합계'`

​         `when grouping(dept_code)=1` 

​           `and grouping(job_code)=0`

​         `then '직급별합계'`

​          `when grouping(dept_code)=0` 

​           `and grouping(job_code)=0`

​         `then '그룹별합계'`

​         `else '전체합계'--둘다일인경우`

​         `end as 합계구분`

`from employee`

`group by cube(dept_code, job_code)`

`order by 1, 2;`

​     

​     

문제)총계, 소계 만들기

​     

`SELECT DECODE(GROUPING(DEPT_CODE),1,DECODE(GROUPING(JOB_CODE),1,'총합계',0,'직급합계'),0,NVL(DEPT_CODE,'부서없음')) 부서코드,`

​       `DECODE(GROUPING(JOB_CODE),1,DECODE(GROUPING(DEPT_CODE),1,'-->',0,'부서합계'),0,JOB_CODE) 직급코드,` 

​       `SUM(SALARY)`

`FROM EMPLOYEE`

`GROUP BY CUBE(DEPT_CODE, JOB_CODE)`

`ORDER BY 1,2;`

​     

D1 J6 6440000

D1 J7 1380000

D1 부서합계 7820000

D2 J4 6520000

D2 부서합계 6520000

D5 J3 3500000

D5 J5 8460000

D5 J7 3800000

D5 부서합계 15760000

D6 J3 7300000

D6 J4 2800000

D6 부서합계 10100000

D8 J6 6986240

D8 부서합계 6986240

D9 J1 8000000

D9 J2 9700000

D9 부서합계 17700000

부서없음 J6 2320000

부서없음 J7 2890000

부서없음 부서합계 5210000

직급합계 J1 8000000

직급합계 J2 9700000

직급합계 J3 10800000

직급합계 J4 9320000

직급합계 J5 8460000

직급합계 J6 15746240

직급합계 J7 8070000

총합ㄱㅖ --> 70096240

​     

​     

​     

<SET OPERATOR>

두 개 이상의 SELECT 결과를 합치거나, 중복을 별도로 제거하거나 이 전에 있는 값만 출력하거나 하는 집합으로서의 제 2의 결과를 만들어 내는 명령어

UNION : 합집합, **order by는 제일 마지막에 1번만 쓸 수 있다.

UNION ALL : 합집합, 중복을 포함

INTERSECT(교집합) : 중복되는 값만 가져옴

MINUS:차집합

​     

***어떠한 셋 명령어를 사용하더라도 반드시 사용되는 SELECT의 모양이 같아야 한다.

컬럼 개수와 자료형 형태가 같아야 한다. 

​     

​     

GROUPING SET 그룹집합 함수

그룹별로 처리된 여러개의 결과 셋을 하나로 합칠 때 사용

​     

예)

`SELECT DEPT_CODE, JOB_CODE, MANAGER_ID, TRUNC(AVG(SALARY))`

`FROM EMPLOYEE`

`GROUP BY GROUPING SETS((DEPT_CODE, JOB_CODE, MANAGER_ID), (DEPT_CODE, MANAGER_ID), (JOB_CODE, MANAGER_ID));`

``     

​     

JOIN

두 개 이상의 테이블을 합쳐야함.

​     

ORACLE구문

 !!다른경우

`SELECT EMP_ID, EMP_NAME,DEPT_TITLE`

`FROM EMPLOYEE, DEPARTMENT`

`WHERE DEPT_CODE=DEPT_ID`

`order by 1;`

​     

!!같은경우

`SELECT EMP_ID, EMP_NAME, EMPLOYEE.JOB_CODE, JOB_NAME`

`FROM EMPLOYEE, JOB`

`WHERE EMPLOYEE.JOB_CODE=JOB.JOB_CODE;`

`order by 1;`

​     

ANSI표준 구문

​     

`SELECT EMP_ID, EMP_NAME, DEPT_TITLE`

`FROM EMPLOYEE`

`JOIN DEPARTMENT`

`ON(DEPT_CODE=DEPT_ID);`

``     



조인문

INNER JOIN : 두 값 모두 일치하는 결과를 가져오는 거

OUTER JOIN : 둘 중 하나, 혹은 둘 모두를 가져오는 거

(1.LEFT: 왼쪽(먼저 선언되는 테이블) 기준, 2. RIGHT:오른쪽(나중에 선언되는 테이블)기준 3.FULL : 전부다(오라클은X))

​     

--ANSI LEFT정렬

`SELECT DEPT_CODE, EMP_NAME`

`FROM EMPLOYEE`

`LEFT JOIN DEPARTMENT ON(DEPT_CODE = DEPT_ID);`

​     

--ORACLE LEFT정렬

`SELECT DEPT_CODE, EMP_NAME`

`FROM EMPLOYEE,DEPARTMENT` 

`WHERE(DEPT_CODE(+) = DEPT_ID);`

​     

​     

CROSS JOIN

서로 같은 값을 가지지 않는 테이블이 있을 경우, 이를 조회하고자 할 때 사용하는 방식이 크로스 조인이다. 같은 컬럼이 없어서 경우의수로 다 출력함.

​     

이를 카테시안 곱이라고 하는데 , 각 컬럼의 결과를 경우의 수 기준으로 출력되는 형태의 결과 셋을 말한다.

따라서 SQL개발자들이 가장 지양하는 방식이다.

TEST DATA, SAMPLE DATA만들 때 

​     

EQ-JOIN

양측 모두 같은 컬럼으로 JOIN하는 것을 EQUAL JOIN이라고 한다.

기존의 연결방식.

<--> NON EQ JOIN

지정한 컬럼 값 자체가 아닌 특정 범위에 속하는 조건으로 조인을 수행할 경우 사용하는 함수들.

​     

ON형식을 사용하면 내부에 원하는 조건을 부여할 수 있다.

`SELECT EMP_NAME, DEPT_CODE, SALARY, E.SAL_LEVEL`

`FROM EMPLOYEE E`

`JOIN SAL_GRADE ON(SALARY BETWEEN MIN_SAL AND MAX_SAL);`

​     

SELF JOIN

자기 자신을 조인의 대상으로 삼는 JOIN

한 테이블의 정보 중 값 비교가 가능한 컬럼끼리 하나로 묶어 조회하고자 할 때 사용

​     

--ORACLE

`SELECT E.EMP_ID 사번, E.EMP_NAME 직원명, M.MANAGER_ID 관리자사번, M.EMP_NAME 관리자명`

`FROM EMPLOYEE E, EMPLOYEE M`

`WHERE E.MANAGER_ID=M.EMP_ID;`

``     

ANSI

`SELECT E.EMP_ID 사번, E.EMP_NAME 직원명, E.MANAGER_ID 관리자사번, M.EMP_NAME 관리자명`

`FROM EMPLOYEE E`

`JOIN EMPLOYEE M`

`ON (E.MANAGER_ID=M.EMP_ID);`

``     

​     

​     

다중조인

여러개의 테이블을 조인하는 거 조인한 결과를 기준으로 하나씩 다음 조인을 수행한다는 거

**순서에 유의