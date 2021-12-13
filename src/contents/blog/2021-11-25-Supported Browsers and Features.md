---
layout: post
categories: ['React']
title: 번역 CRA Supported Browsers and Features
---

## Supported Browsers and Features

[CRA Supported Browsers and Features](https://create-react-app.dev/docs/supported-browsers-features/) 를 번역한 글이다. 원문은 이 링크를 참조하면 된다.

원 글에서의 `this project`는 편의상 `CRA`로 작성했고, 한글로 해석하는 것보다 원문 단어 그대로 두는게 낫다고 생각된 경우에는 단어 그대로 두었다.

## 지원하는 브라우저

기본적으로, CRA로 생성된 프로젝트는 모든 최신 브라우저를 지원합니다. Internet Exproler 9, 10 및 11을 지원하려면 polyfills가 필요합니다. 오래된 브라우저를 지원하는 polyfills set를 사용하려면 [react-app-polyfill](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md) 를 사용하세요

## 지원되는 언어

CRA는 최신 javascript 표준의 상위 집합을 지원합니다. [ES6](https://github.com/lukehoban/es6features) 문법 뿐만 아니라 다음 내용을 지원합니다.

- [Exponentiation Operator](https://github.com/tc39/proposal-exponentiation-operator) (ES2016).
- [Async/await](https://github.com/tc39/proposal-async-await) (ES2017).
- [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018).
- [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 4 proposal)
- [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
- [JSX](https://reactjs.org/docs/introducing-jsx.html), [Flow](https://create-react-app.dev/docs/adding-flow/) and [TypeScript](https://create-react-app.dev/docs/adding-typescript/).

[different proposal stages](https://tc39.es/process-document/)에 대해 자세히 알아보세요

Experimental proposals을 주의해서 사용하는 것을 권장하긴 하지만, Facebook 은 product code에서 이러한 특징들을 많이 사용하기 때문에, 향후 proposals 변경된다면 [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb)를 제공할 예정입니다.

Note - CRA에서는 기본적으로 [polyfills](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md) 을 포함하지 않습니다.

런타임 지원이 필요한 다른 ES6+ 기능들 (`Array.from()` 또는 `Symbol` 등)을 사용하는 경우 적절한 [polyfill](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md)을 직접 포함하거나, 사용할 브라우저에서 이미 지원을 하고 있는지를 확인하세요.

## 지원되는 브라우저 구성

기본적으로 CRA로 생성된 프로젝트는 [browserslist](https://github.com/browserslist/browserslist) 설정이 `package.json` 파일에 포함되는데, 해당 설정은 production build를 위해 전세계 사용량(>0.2%)에 기반한 넓은 범위의 브라우저와 개발을 위한 modern 브라우저를 대상으로 합니다. 특히 async/await와 같은 문법을 사용할 때 좋은 개발 경험을 제공하지만, 그 외 많은 브라우저들과도 높은 호환성을 제공합니다.

`browserslist` 설정은 출력된 Javascript 를 제어하여 내보낸 코드가 지정된 브라우저와 호환되도록 합니다. build 스크립트를 실행하여 production build를 할 때 production list가 사용되고 running the start 스크립트를 사용할 때 development list가 사용됩니다. [https://browserl.ist](https://browserl.ist/)를 사용하면 `browserslist`에서 설정한 브라우저를 볼 수 있습니다.

다음은 `package.json` 파일의 `browserslist` 예시입니다.

```
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}

```

> Note 여기에는 자동으로 polyfill이 포함되지 않습니다. 지원하는 브라우저에 따라 필요한 문법을 polyfill해야 합니다. (위 파일 참조)

> browserslist 설정을 수정할 때 변경 사항이 바로 적용되지 않는것을 알 수 있습니다. 이것은 babel-loader issue 인데, babel-loader가 파일의 변경 사항을 감지하지 못하기 때문입니다. 빠른 해결 방법은 node_modules/.cache 폴더를 삭제하고 다시 시도하는 것입니다
