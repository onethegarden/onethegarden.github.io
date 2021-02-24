---
layout: post
title: python int function

---



# python int함수 n진법



- 프로그래머스 문제를 풀면서 파이썬의 int 함수에 n 진법에 대한 내용을 알게되어 정리한다.
- [문제](https://programmers.co.kr/learn/courses/30/lessons/68935?language=python3)

```python
number = 1200
base = 5
answer = int(number, base) #(변환할 수 , 진법)
```



</br></br>

### 1. 문제

>자연수 n이 매개변수로 주어집니다. n을 3진법 상에서 앞뒤로 뒤집은 후, 이를 다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.



### 2. 내 풀이

```python
def solution(n):
    tetra = ''
    answer = 0
    #1. 3진법으로 변환 
    while n > 0:
        tetra += str(n % 3)
        n = n // 3
        
	#2. 수를 뒤집음
    tetra = tetra[::-1]
    
    #3. 뒤집은 수에 3진법 값 적용
    for i in range(len(tetra)):
      answer += int(tetra[i]) * (3 ** (i))
    return answer

```
</br></br>
- 내 풀이는 총 세단계로 이루어 졌는데, 2와 3은 파이썬 ```int()``` 함수를 이용해 진법 변환이 가능하다.

  ```python
  int(x, base=10)
  ```

  ```python
  def solution(n):
      tetra = ''
      #1. 3진법으로 변환 
      while n > 0:
          tetra += str(n % 3)
          n = n // 3
          
      #2. 3진법 적용
  	answer = int(temp, 3)
      return answer
  ```

  

</br></br>

참고 : https://programmers.co.kr/learn/courses/4008/lessons/12733
