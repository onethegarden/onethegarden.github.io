---
layout: post
title: [Spring interview] Prepareation
---

  
# Spring




**1. Dependency Injection**
- 의존성 주입
- 스프링의 선언적 트랜잭션 관리를 포함한 AOP
- Ioc 원칙하에 객체간의 결합을 약하게 해주고 유지보수가 좋은 코드를 만들 수 있게 해줌
- 외부에서 생성한 후 주입해주는 것 setter()혹은 생성자 이용
	1. setter()
	2. 생성자
참고 : https://private.tistory.com/39



**2. IoC, Inversion of Control**
- 의존성 역전
- 컨트롤의 제어권이 사용자가 아니라 프레임워크에 있음
- 필요에 따라 스프링에서 사용자의 코드를 호출



**3. AOP**
- Aspect Oriented Programming 의 약자
- 관점지향 프로그래밍



**3. PSA**
- portable service abstraction
- 일관된 방식으로 접근 가능



**4. Filter와 Interceptor**
- Filter와 Interceptor는 실행되는 시점이 다르다.




**5.pojo, Dispatcher Servlet**

- pojo 
	1. plain old java object
	2. 특정한 인터페이스를 구현하거나 상속을 받을 필요가 없음. 기존에 존재하는 라이브러리를 지원

- Dispatcher Servlet 
	1.일종의 front controller, 



**6.annotation**



**7. Spring MVC구조 처리과정**

1. 클라이언트가 server에 request요청

2. Dispatcher Servlet이 요청을 가로챔

- web.xml에 등록된 url패턴(서블릿 매핑)만 가로챔(*.do)

```java

	<servlet>
		<servlet-name>appServlet</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>/WEB-INF/spring/appServlet/servlet-context.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>appServlet</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

```
3. DispatcherServlet이 HandlerMapping에게 해댕 url에 맞는 컨트롤러가 있는지 물어봄
- servlet-context.xml에서 @Controller로 등록한 것을 스캔


4. 실제 로직처리(Controller ->Service ->DAO ->Mapper ->DB )

5. Dispatcher는 @RequestMapping을 통해 해당 컨트롤러에가서 url에 맞는 메서드를 실행시키라고 요청

6. 컨트롤러에서는 Service를 Di받아 비즈니스 로직을 Service에 위임

7. 결과를 받은 컨트롤러는 Model객체에 결과물에 대한 정보를 담아 DispatcherServlet에 보냄

8. DispatcherServlet은 ViewResolver를 통해 view를 찾음

```xml
<!-- Resolves views selected for rendering by @Controllers to .jsp resources 
		in the /WEB-INF/views directory -->
	<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<beans:property name="prefix" value="/WEB-INF/views/" />
		<beans:property name="suffix" value=".jsp" />
	</beans:bean>
```


9. Dispatcher Servlet이 클라이언트에게 렌더링 된 view를 응답함