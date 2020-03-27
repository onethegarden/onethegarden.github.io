---
layout: post
title: Publish Github 
---

1.  install 'npm i gh-page'


2.package.json파일에 homepage 설정

githubId.github.io/projectName

```json
  "homepage": "https://onethegarden.github.io/movie-app"
```

3. json 파일에 xcript 명령어 추가
```json
  "scripts": {
      ...
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  },
```


npm run deploy => predeploy호출, predeploy가 build호출

build폴더가 생겼는지 확인 후 홈페이지 주소로 들어가보면 됨!
