---
layout: post
title: [Java] interview Prepareation
---



# Java




**1. Call by value , Call by reference 차이점**

-  값에 의한 호출, 참조에 의한 호출
- C 에서는 pointer라는 개념이 있어서 이 둘이 분명히 나뉠 수 있다.
- java에서 이 주제가 여러 커뮤니티에서 오랬동안 논의되었다고 한다.
- 결과적으로 Java의 메서드 인자전달 방식은 call by value라고 한다. 
참고 : http://mussebio.blogspot.com/2012/05/java-call-by-valuereference.html
참고 2: https://brunch.co.kr/@kd4/2


일단, call by value는

>passing arguments to a function copies the actual value of an argument into the formal parameter of the function. In this case, changes made to the parameter inside the function have no effect on the argument.
>원래 값을 복사해서 파라미터로 넘기기 때문에 원래값에 변화가 없다.



call by reference

>passing arguments to a function copies the address of an argument into the formal parameter. Inside the function, the address is used to access the actual argument used in the call. It means the changes made to the parameter affect the passed argument.
>주소 값을 복사해서 파라미터로 넘기기 때문에 원래값에 영향을 끼친다.

참고 : https://www.tutorialspoint.com/cprogramming/c_function_call_by_value.htm#:~:targetText=The%20call%20by%20value%20method,by%20value%20to%20pass%20arguments.



**2. Abstract class, Interface**
- Abstract class 
    1. 추상클래스는 추상 클래스를 상속 받아서 기능을 이용하고 확장
    2. 다중상속의 모호성 때문에 이건 못함
    3. 슈퍼클래스의 **기능을 이용하거나 확장**하기 위해

- Interface : 함수의 구현을 강제해서 구현 객체의 같은 동작을 보장
    1. 인터페이스를 구현한 객체들에 대해서 **동일한 동작을 약속**
    2. 다중 상속이 가능함

참고 : https://brunch.co.kr/@kd4/6




**3. 다형성 Overriding, Overloading**
- 둘 다 다향성을 지원, Polymorphis란 상속을 통해 기능 확장, 변경, 같은 클래스 내에 코드의 길이를 줄여줌.
-  Overriding: 상속에서 나온 개념, 상위클래스의 메소드를 하위클래스에서 재정의
- Overloading : 같은 이름의 메소드를 여러개 정의, 파라미터 타입이나 개수가 다름




**4. OOP?**
- Object-Oriented Programming
- 객체 지향 프로그래밍, 데이터를 객체로 취급
- 상속을 통한 장점 극대화




**5. Generic**
- 클래스, 메서드에서 사용할 객체의 타입을 정하는 것
- 코드 가독성 증가
- 타입 안정성 

```java
Member <Students>m = new Member();
```



**6. JDBC**
-Java Data Base Connection, java를 통해 DB에 접근할 수 있게하는 프로그래밍




**7. JSP, Servlet**
- JSP : (java Server Page) java in html
- Servlet : Container가 이해할 수 있게 구성된 자바코드 Html in java




 **8. Primitive Type, Reference Type기본자료형과 참조자료형**
- Primitive Type : boolean, short, int, long, float, double, char 
- Reference Type : classType, Interface Type, Arraay Type, Enum Type, String type




**JSP**
```html
<body>
	<script>
		alert("${msg}");
		location.href='${pageContext.request.contextPath}${loc}';
	</script>
</body>
```



**Servlet**
```java
public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("text/html");
        printWriter pw = response.getWriter();
        
        pw.println(docType + 
            "<BODY>" +  
                <p>내용</p>
            "</BODY>");
        )
    }
```

