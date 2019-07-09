---
layout: post
title:  "2019-07-09 today i learned"
date:   2019-07-09 21:15:00 +0700
categories: [oracle, css]
---


## 1. [Oracle]

<H4>procedure</H4>
<P>
    pl/sql문을 저장하는 객체로 plsql을 저장해놓고 사용할 수 있게 한다.<BR><BR>
    생성방법<br>
create procedure프로시저명<br>
is pl/sql구문
</p>



create procedure del_emp

is

​    begin

​        delete from emp_copy;

​        commit;

end;

/

​     

매개변수가 있는 프로시저

create or replace procedure del_emp_id<b>(v_id employee.emp_id%type)</b>b>

is

​    begin

​        delete from emp_copy where emp_id=v_id;

​        insert into emp_history values (v_id,sysdate);

​        end;

​        /

​     

--프로시저 호출

<b>exec</b> del_emp_id('&사원번호');





<H4>in/out 변수 프로시저</H4>
<P>
    - 프로시저의 실행결과를 변수에 넣어서 외부로 데이터를 보낼 수 있음. 
    <br>
- IN은 외부에서 받는 값 <BR><BR>
</p>



**CREATE** OR REPLACE PROCEDURE SEL_EMP(

​    V_EMP_ID IN EMPLOYEE.EMP_NO%TYPE,

​    V_SALARY OUT EMPLOYEE.SALARY%TYPE,

​    V_BONUS OUT EMPLOYEE.BONUS%TYPE

)

**IS**

**BEGIN**

​    SELECT  SALARY, NVL(BONUS,0)

​    INTO V_SALARY, V_BONUS

​    FROM EMPLOYEE

​    WHERE EMP_ID=V_EMP_ID;

**END**;

/

--바인드 변수 선언

**VARIABLE** VAR_SALARY NUMBER;

**VARIABLE** VAR_BONUS NUMBER;

​     

--프로시저

**EXEC** SEL_EMP('&사원번호',:VAR_SALARY,:VAR_BONUS);

​     

--출력

**PRINT** VAR_SALARY;

**PRINT** VAR_BONUS;





<H4>FUNCTION</H4>
<P>
    - 프로시저와 비슷함, 리턴값이 존재 
    <br>
</p>



**CREATE** OR REPLACE FUNCTION SAL_CAL(V_EMP_ID EMPLOYEE.EMP_ID%TYPE)

​     **RETURN** NUMBER

​     **IS**

​        V_SALARY NUMBER;

​        V_BONUS NUMBER;

​        V_RESULT NUMBER;

​    **BEGIN**

​        SELECT SALARY, NVL(BONUS,0)

​        INTO V_SALARY, V_BONUS

​        FROM EMPLOYEE

​        WHERE EMP_ID=V_EMP_ID;

​        

​        --값을 집어넣음

​        V_RESULT**:=**(V_SALARY+(V_SALARY* V_BONUS))*12;

​        **RETURN V_RESULT;**

​        

​    **END;**

​    /

​    

--출력1

SELECT SAL_CAL('&EMP') FROM DUAL;

--출력2

SELECT * FROM (SELECT (SALARY+(SALARY*NVL(BONUS,0)))*12

​                AS TOTAL, A.*

​                FROM EMPLOYEE A)

WHERE TOTAL> SAL_CAL('&EMP');







<H4>CORSOR</H4>
<P>
   --SELECT 문의 결과 RESULTSET을 보관하는 변수로 보면 됨.<BR>
--CURSOR사용<BR>
--CURSOR 변수명 IS SELECT ~~~;<BR>
--PL/SQL안에서 OPEN 커서 변수명 FETCH 커서변수명 INTO 변수명, 변수명<BR>
--커서는 반복문 안에 실행<BR>
--반복문을 중단하기 위해 EXIT THEN %커서상태 (조건을 씀)<BR>
--종료가 되면 커서를 닫아야함 CLOSE
    <br>
</p>



**DECLARE**

​    V_EMP_NAME EMPLOYEE.EMP_NAME%TYPE;

​    V_EMP_SALARY EMPLOYEE.SALARY%TYPE;

​    **CURSOR** C1

​    IS SELECT EMP_NAME, SALARY FROM EMPLOYEE;

**BEGIN**

​    **OPEN** C1;

​    **LOOP**

​    **FETCH** C1 INTO V_EMP_NAME, V_EMP_SALARY;

​    **EXIT WHEN** C1%NOTFOUND;

​    DBMS_OUTPUT.PUT_LINE(V_EMP_NAME||V_EMP_SALARY);

​    **END LOOP;**

​    **CLOSE** C1;

**END;**

/

​    

--간단하게?

DECLARE

​    V_EMP_NAME EMPLOYEE.EMP_NAME%TYPE;

​    V_EMP_SALARY EMPLOYEE.SALARY%TYPE;

​    V_EMP EMPLOYEE%ROWTYPE;

​    CURSOR C1

​    IS SELECT * FROM EMPLOYEE;

BEGIN

   FOR V_EMP IN C1 LOOP -- 여기서는 알아서 OPEN 하고 CLOSE함.

   DBMS_OUTPUT.PUT_LINE(V_EMP.EMP_NAME||V_EMP.SALARY);

   END LOOP;

END;

/

​    

----더 간단하게

BEGIN 

​    FOR K IN(SELECT * FROM EMPLOYEE) LOOP

​        DBMS_OUTPUT.PUT_LINE(K.EMP_NAME||K.SALARY);

​    END LOOP;

END;

/







<H4>TRIGGER</H4>
<P>
--CREATE TRIGGER 트리거 명칭<BR>
--BEFORE|AFTER DML명령어 ON 대상테이블<BR>
--FOR EACH ROW<BR>
--수행될 PL/SQL구문<BR>
--트리거 트랜젝션 처리가 어려움..<BR>
    <br>
</p>



--상품관리 테이블 (상품, 총수량)

--입출고관리 테이블(입고, 출고 내용을 관리)

CREATE TABLE PRODUCT(

​    PCODE NUMBER PRIMARY KEY,

​    PNAME VARCHAR2(30),

​    BRAND VARCHAR2(30),

​    PRICE NUMBER,

​    STOCK NUMBER DEFAULT 0

);

--두번째

CREATE TABLE PRO_DETAIL(

​    DCODE NUMBER PRIMARY KEY,

​    PCODE NUMBER REFERENCES PRODUCT(PCODE),

​    PDATE DATE, 

​    AMOUNT NUMBER,

​    STATUS VARCHAR2(10) CHECK(STATUS IN('입고','출고'))

);

​     

SELECT * FROM PRODUCT;

SELECT * FROM PRO_DETAIL;

CREATE SEQUENCE SEQ_PRO;

CREATE SEQUENCE SEQ_DE;

INSERT INTO PRODUCT VALUES(SEQ_PRO.NEXTVAL,'노트북','애플',3000000,DEFAULT);

INSERT INTO PRODUCT VALUES(SEQ_PRO.NEXTVAL,'엑스박스','마쏘',400000,DEFAULT);

INSERT INTO PRODUCT VALUES(SEQ_PRO.NEXTVAL,'티코','대우',300000,DEFAULT);

INSERT INTO PRODUCT VALUES(SEQ_PRO.NEXTVAL,'컴퓨터','한성',1200000,DEFAULT);

​     

--INSERT 했을 때 실행되는 구문, 지금 들어오는 값을 알고싶음.

--INSESRT할 때는 NEW만, DELETE할 때는 OLD만 둘 다 있는 거는 UPDATE 

CREATE TRIGGER TG_PRO_DE

AFTER INSERT ON PRO_DETAIL

FOR EACH ROW

BEGIN

​    IF :NEW.STATUS='입고' 

​        THEN UPDATE PRODUCT SET STOCK=STOCK+:NEW.AMOUNT

​            WHERE PCODE=:NEW.PCODE;

​    ELSIF :NEW.STATUS='출고'

​        THEN UPDATE PRODUCT SET STOCK=STOCK-:NEW.AMOUNT

​            WHERE PCODE=:NEW.PCODE;

​    END IF;

END;

/

SELECT * FROM PRODUCT;

INSERT INTO PRO_DETAIL VALUES(SEQ_DE.NEXTVAL,'3',SYSDATE,200,'입고');

INSERT INTO PRO_DETAIL VALUES(SEQ_DE.NEXTVAL,'2',SYSDATE,5,'입고');

INSERT INTO PRO_DETAIL VALUES(SEQ_DE.NEXTVAL,'1',SYSDATE,10,'출고');

​     

create user  finalworkshop identified by finalworkshop;

grant resource, connect to finalworkshop;







## 2. [CSS]

<H5>웹 폰트 적용</H5>
@import사용









