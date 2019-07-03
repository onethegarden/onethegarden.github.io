---
layout: post
title:  "2019-07-01 today i learned"
date:   2019-07-01 18:34:10 +0700
categories: [oracle, html]
---


## 1. [Oracle]

Subquery
- 단일행 서브쿼리 : 서브쿼리 행이 1개 예) MAX나 MIN같은

- 다중행 서브쿼리 : 서브쿼리의 행이 여러개, 예) GROUP BY로 묶은 값
*사용 가능 연산자 
동등비교 :　IN | NOT IN
대소비교 :  ANY | ALL
상관성 서브쿼리 : EXISTS | NOT EXIST

예) ANY : 급여가 J3인 사원의 급여의 최소값보다 많이 받는 사원
SELECT EMP_NAME, JOB_CODE, DEPT_CODE, SALARY
FROM EMPLOYEE
WHERE SALARY >ANY(
            SELECT SALARY
            FROM EMPLOYEE
            WHERE JOB_CODE='J3');
--J3인 직원이 3명인데 그 중 최소값보다 많이 받는 사람을 찾아냄
만약 WHERE SALARY >ANY( 이면 최대값보다 적게받는 사람

*ALL을 쓸 경우 전체 값으로 비교함. 

*EXISTS 존재하는 걸 찾는 거

SELECT *
FROM EMPLOYEE M
WHERE EXISTS(
        SELECT DEPT_CODE
        FROM EMPLOYEE E
        WHERE M.DEPT_CODE IN('D5','D9'));


- 다중열 서브쿼리 : 서브쿼리의 로우값이 여러개

SELECT EMP_NAME, JOB_CODE, DEPT_CODE, HIRE_DATE
FROM EMPLOYEE
WHERE (DEPT_CODE,JOB_CODE) IN( --WHERE 뒤에 괄호로 묶음
            SELECT DEPT_CODE, JOB_CODE
            FROM EMPLOYEE
            WHERE SUBSTR(EMP_NO,8,1)='2'
            AND ENT_YN='Y');

-다중행 다중열 서브쿼리
SELECT EMP_NAME, JOB_CODE, DEPT_CODE, HIRE_DATE, SALARY
FROM EMPLOYEE
WHERE(JOB_CODE, SALARY) IN(
               SELECT JOB_CODE, MIN(SALARY)
               FROM EMPLOYEE
               GROUP BY JOB_CODE)
ORDER BY 2;

## 2. [HTML]

기본적인 문법 공부


<code> h1,h2,h3 </code> 제목
<code> p, /p </code> 단락
<code> br </code> 줄바꿈
<code> hr </code> 줄 생김
<code> ol, ul, li </code> ol은 리스트 순서 있을 때, ul은 순서 없을 때 
<code> ol type="a"  </code>  abc 순서대로 리스트 만들기, A가능, 기본값은 숫자
<code>li, /li</code> 리스트를 묶는 거 
<code>table</code> 표 만들기







