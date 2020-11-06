---
layout: post
title: Python String Method
---



## Python 문자열 관련 함수 ##



- Indexing : [i]

  ```python
  st = [1, 2, 3, 4, 5]
  
  st[0] #1
  st[-1] #5 : 뒤에서 첫번째
  st[1] = 5 # 2를 5로 치환
  
  ```

  

- Slicing [s:e]

  ```python
  st = [1, 2, 3, 4, 5]
  
  st[0:2] #123 0부터 2사이
  st[2:] #2345 2부터 끝까지
  st[:] #12345 처음부터 끝까지
  st[-100:100] #12345 범위 내의 값으로 자동 처리
  st[:-1] #123 맨 끝 값 제외하고 전체
  st[::2] #1 3 5 2칸 마다
  st[::-1] #54321 거꾸로 정렬
  
  ```



- Repetition

  ```python
  st = [1, 2, 3]
  
  st*2 #123123 두 번 반복
  ```

  

- Membership Test 

  ```python
  st = [1, 2, 3]
  
  2 in st #true
  22 in st # false
  ```

  

- Length

  ```python
  st = [1, 2, 3]
  
  len(st) #3 
  ```

  

참고 : http://egloos.zum.com/itbaby/v/4243381