---
layout: post
title: CORS Error 해결
path: cors-error
categories: ['CORS']
---



# CORS Error 해결하기



> CORS : Cross - Origin Resource Sharing
>
> 교차출처리소스 공유는 추가 [HTTP](https://developer.mozilla.org/ko/docs/Glossary/HTTP) 헤더를 사용하여, 한 [출처](https://developer.mozilla.org/ko/docs/Glossary/Origin)에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.
>
> [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#HTTP_%EC%9D%91%EB%8B%B5_%ED%97%A4%EB%8D%94)



다른 도메인에서 API를 요청해 사용할 수 있게 하려면 CORS 규칙이 필요하다. 백엔드 개발자에게 해당 도메인을 허용해 달라고 요청을 해야한다. 

>웹팩 개발서버의 프록시를 사용하게 되면, 브라우저 API 를 요청 할 때 백엔드 서버에 직접적으로 요청을 하지 않고, 현재 개발서버의 주소로 요청을 하게 됩니다. 그러면 웹팩 개발 서버에서 해당 요청을 받아 그대로 백엔드 서버로 전달하고, 백엔드 서버에서 응답한 내용을 다시 브라우저쪽으로 반환합니다. 웹팩 개발서버의 proxy 설정은 원래 웹팩 설정을 통해서 적용을 하지만, CRA 를 통해 만든 리액트 프로젝트에서는 package.json 에서 `"proxy"` 값을 설정하여 쉽게 적용 할 수 있습니다
>
>[벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html)







하지만 webpack은 **Proxy**라는 기능을 제공한다! CRA로 만든 프로젝트는 package.json의 `proxy`를 통하여 쉽게 적용할 수 있다. 





접속하고자 하는 url을  root 경로에 있는 `package.json`에 입력해 준다.

```json
{
 ... 
  "proxy": "http://localhost:4000"
}
```



그리고 api 요청하는 부분도 앞에 BASE_URI를 빼고 요청하도록 수정한다. 요청하는 도메인이 생략된 경우 현재페이지를 가리키게 된다 

```typescript
// const BASE_URI = 'http://localhost:4000'

export const UserAPI = {
  login: async (loginForm: LoginType): Promise<UserResponse> => {
    // const response = await axios.post<UserResponse>(`${BASE_URI}/login`, loginForm);
    const response = await axios.post<UserResponse>(`/login`, loginForm);
    return response.data;
  },
}
```



실제로 `localhost:3000` 으로 요청을 했지만, 중간에 프록시 서버를 통해 요청이 갔기 때문에 서버에서는 `http://localhost:4000` 로 요청이 간 것으로 인식하여 CORS에러가 나지 않는다.









## production에서는

react와 api가 도메인이 같다면 이대로 진행을 해도 되지만, 도메인이 서로 다르다면 axios의 baseURL로 아래와 같이 설정해 줄 수 있다. 

```typescript
const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_URI || '/';
const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
});
```




