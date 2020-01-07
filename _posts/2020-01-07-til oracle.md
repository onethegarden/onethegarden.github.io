---
layout: post
title: oracle Numberic Function
---


 **Numberic Function**

    1. ABS : return absolute value, 절댇값 반환


    ```sql

    SELECT ABS(-5) FROM DUAL;


    --result--
     absolute
    ----------
           15
    ```



    2. ACOS: return arc cosine , 아크 코사인을 반환


    ```sql

    SELECT ACOS(.3) FROM DUAL


    --result--
     arc_cosine
    ----------
     1.26610367
    ```





    3. ADD_MONTHS : return the data plus integer months , 월에 숫자 더하기


    ```sql

    SELECT TO_CHAR(
        ADD_MONTHS(hire_date,1),
        'DD-MON-YYYY') "Next month"
        FROM employees
        WHERE last_name = 'Baer';
    )


    --result--
     Next month
    ----------
     07-JUL-1994

    ```


   -  한달 전 날짜
    
    ```sql

    SELECT TO_CHAR(
        ADD_MONTHS(sysdate,-1),
        'yyyymmdd')
    FROM DUAL;
    )


    --result--
     sysdate
    ----------
    20191207
     
    ```



 
    5. BITAND : Operation on the bits 비트연산
    
    ```sql

    SELECT code
            , DECODE(BITAND(code,1),1,'남','여') AS '남여구분'
            , DECODE(BITAND(code,2),2,'내국인','외국인') AS '내/외국인 구분'
    FROM data;
        




    --result-----------
     code       남여구분      내/외국인구분
    -------------------
     00        남             내국인
     10        여             내국인
     
    ```







    6. CEIL : 올림


    ```sql
    SELECT CEIL(order)
    FROM orders

    
    --result--
     CEIL(order)
    ----------
    255
     
    ```












        










출처 : https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions001.htm