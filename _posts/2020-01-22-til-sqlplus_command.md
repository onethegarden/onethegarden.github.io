---
layout: post
title: Sqlplus command
---


 **sqlplus command**

기본적인 sql 명령을 수행하기 위한 유닉스명령어


 
 1. sql 연결

    - c 드라이브로 간 다음

    ```
    sqlplus id/pw
    ```



2. 쿼리의 결과를 파일에 저장하기

    ```
    SPOOL 파일명.확장자

    실행할쿼리

    SPOOL OFF         //종료
    
    ```



3. sql실행

    ```
    @ 파일이름
    ```


4. 탈출,종료

    ```
    exit
    ```

