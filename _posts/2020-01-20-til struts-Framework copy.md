---
layout: post
title: Struts Framework
---


 **Struts Framework**

2007~2008년도 쯤에 쓰였던 프레임워크라고 알고있다.

요즘 쓰는데는 거의 찾아보기 힘들고(공룡과 같다. 아니면 화석)
지금 일하는 곳에서 2007년쯤에 만들어진 프로젝트를 유지보수 하는데 

struts프레임워크, 이클립스(갈릴레오), 맥시전트(오라클)
이것들인데 인터넷에 찾아봐도 잘 나오지 않기 때문에 좀 정리해 두려고 한다.


1. 데이터흐름
jsp - Action - App - Biz - Dao(java, xml)- DB

Action : controller의 역할, jsp의 요청을 처리한다.

App,Biz : service의 역할, 사실 이 두개가 왜 나눠져 있는지 모르겠다.

Dao : db와의 연결을 담당한다.

