---
layout: post
title: Publish Github 
---

1.  install 'npm i gh-page'


2. put a homepage on the package that JSON

```json
  "homepage": "https://onethegarden.github.io/Movie-app"
```




3. create two command deploy, predeploy
```json
  "scripts": {
      ...
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  },
```