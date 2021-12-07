---
layout: post
title: git commit username 수정하기
categories: ['Git']
---

## git commit username 수정하기

> username이 잘못 커밋되었을 때 커밋을 수정해보자!

- 예전에 한 commit 의 username이 잘못 올라갔을 경우!

  (다른 컴퓨터로 커밋을 했을 때 종종 발생하는 일이다,,, 나 또한 ㅠㅠ,,,)

  `git log`로 잘못한 커밋을 몇 번째인지 확인한다.

<br/>

### 1. **rebase**를 사용한다 HEAD~(커밋 개수) 지금부터 이전까지 3개의 커밋을 가져온다

```
git rebase -i HEAD~3
```

### 2. pick을 edit으로 수정해주고 save and quit(:wq)를 한다.

![image](https://user-images.githubusercontent.com/51187540/120197622-221c6c80-c25c-11eb-8548-99923d5ab03a.png)

`pick`은 그 커밋을 사용

`edit`은 그 커밋을 수정

`esc `누르면 일반모드, `: (콜론)` 누르면 명령행 모드

### 3. `amend`옵션을 사용해 commit 을 수정한다.

```
git commit --amend --author="새로운-사용자명 <새로운-이메일>"
```

```
git commit --amend --author="onethegarden <onethegarden@gmail.com>"
```

- 이렇게 치면 vim창이 다시 열리는데 commit message를 그대로 두고싶다면 바로 `:q`를 누르면 된다.

### 4. 다음 커밋으로 넘겨준다.

```
git rebase --continue
```

끝났다고 할 때 까지 반복해준다.

<br/>

### 5. 강제 push

```
git push -f <remote명> <branch명>
```

```
git push -f origin master
```
