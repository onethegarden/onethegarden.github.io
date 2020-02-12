 ---
layout: post
title: String compare
---

vo에 값이 있을 때 조건을 걸어주려했는데
if문 안에 들어가지 않았다.


```java

vo.getName()= "";

if (vo.getName()!=null&& vo.getName()!="null"){
    system.out.println("if 문 안");
}

```

그래서 조건을 length를 이용한 값을 주었더니 
if문 안에 들어갔다.


```java

vo.getName()= "";

if (vo.getName().length()>0){
    system.out.println("if 문 안");
}

```


String은 equals로 비교해야 된다는 걸 잊고 있었다 


>equals()는 value를 비교하고
>== 은 reference를 비교한다.


```java
vo.getName().equals("")
```



하지만 equals는 String인 ""를 생성 후 내부에서 비교하기 때문에 느리고
length함수를 사용하는 게 int변수 하나만 리턴해서 빠르다고 한다.

