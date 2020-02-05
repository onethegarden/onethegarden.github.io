---
layout: post
title: Java batch
---

Batch : 주기적으로 어떤 동작을 실행해야 할 때 씀!
배치가 돌아~ 이러면서 실무에서 많이 쓴다

>DOM에서부터 시작되었고, 여러 명령어를 한 번에 수행할 수 있음, .bat이라는 확장자명을 씀



설정파일 
1. jobDetailFactoryBean
2. CronTriggerFactoryBean
3. SchedulerFactoryBean




CronTriggerFactoryBean설정

'''Xml
<property name="cronExpression" value="0/5 * * * * ?" />

'''


3일마다

'''Xml
<property name="cronExpression" value="003 * * ?" />

'''





배치파일 예제

```bat
@echo HelloWorld
pause

```





출처 : https://blog.naver.com/PostView.nhn?blogId=p952973&logNo=221011408841

더 자세히 공부해야 할 것
