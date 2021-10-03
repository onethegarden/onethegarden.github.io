---
layout: post
title: React Suspense 를 이용한 로딩처리

---

# React Suspense 를 이용한 로딩처리



## 🎅🏻 react suspense 란! 

>`<Suspense>` component that lets you “wait” for some code to load and declaratively specify a loading state (like a spinner) while we’re waiting
>
>https://reactjs.org/docs/concurrent-mode-suspense.html#what-is-suspense-exactly

서스펜스는 어떤 조건이 충족될 때까지 대기하고 기다리는 동안 (스피너와 같은)로딩상태를 선언적으로 지정할 수 있다.







대부분의 경우 서버로 데이터 요청을 보낼 때 앱이 일시중지 된다.  

일반적으로 화면이 정지한 상태로 있으면 사용자 경험을 해치기 때문에 서버에 요청을 보내기 전에 로딩중이라는 상태를 띄우고, 요청이 완료되면 로딩중이라는 상태를 없앤다. 

이런식으로 처리를 해주는데, 비동기 요청마다 loading과 error 를 처리해 주어야 한다.

```react
function User(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetchUser(props.id)
      .then((userResponse) => {
        setUser(userResponse);
        setLoading(false);
      )
      .catch((e) => {
        setError(e);
        setLoading(false);
      );
  }, [props.id]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>something happened :(</div>;

  return <div>{user.name}</div>;
}

function App() {
  return <User id={someIdFromSomewhere} />;
}}
```







리액트 서스펜스는 pending 된 promise 가 있으면 fallback을 렌더링 해주고, promise의 요청이 완료된 후 children을 렌더링 해준다.

서스펜스에서 로딩을 fallback해주고, errorBoundary에서 에러를 캐치해 준다

react-query나 swr를 사용하면 Suspense를 사용할 수 있다. 아니면 fetch 를 사용해 직접 promise 를 throw 해도 된다

```react
function User(props) {
  const user = props.userReader(); // 이 함수는 호출될 때 사용자를 반환하는 동기함수이다 (react-query, swr로 사용할 수 있다)

  return <div>{user.name}</div>;
}

function App() {
  const userReader = initializeUserReader(someIdFromSomewhere);

  return (
    <ErrorBoundary error="something went wrong with the user :(">
      <Suspense fallback="loading...">
        <User userReader={userReader} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

예제 출처 : https://dev.to/andreiduca/practical-implementation-of-data-fetching-with-react-suspense-that-you-can-use-today-273m







부분적인 로딩처리도 가능하다.

공식문서에 예제로 나온 코드팬을 보면 이해가 더 쉽게 된다.

https://codesandbox.io/s/infallible-feather-xjtbu?file=/src/fakeApi.js





서스펜스에 대한 자세한 내용은 공식문서를 참고하면 좋다

https://reactjs.org/docs/concurrent-mode-suspense.html#what-is-suspense-exactly





위에서 말한 fetchAPI 와 서스펜스를 함께 쓰는 내용은 아래 글을 참고하면 좋고, 서스펜스의 원리도 코드로 나와있어서 이해하기 좋다 

https://charles-stover.medium.com/react-suspense-with-the-fetch-api-a1b7369b0469



