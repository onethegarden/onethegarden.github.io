 ---
layout: post
title: Eclipse JRE Error
---


자바 buildpath까지 등록했는데도 에러가 나는 경우 , 
나같은 경우는 서로 다른 프로젝트에 다른 자바 버젼을 쓰고있어서였다 


에러메세지 


> A java Runtime Environment (JRE) or Java Development kit (JDK) 
>must be available in order to run Eclipse. No Java virtual machine was found


eclipse.ini 파일에 자바 경로 설정해주면 됨 
보통 program file에 있는 자바를 연결해주는데

-vm
C:\Program Files\Java\jdk1.7\javaw.exe




Weblogic을 쓰는 경우

C:\Weblogic\jdk1.7\javaw.exe



