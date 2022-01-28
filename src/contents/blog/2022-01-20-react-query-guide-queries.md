---
layout: post
categories: ['react-query', 'React']
title: react-query guide - Queries
---


## React query - Queries

> [React-query Essentials](https://learn.tanstack.com/p/react-query-essentials)를 듣고 작성한 문서입니다.
> 
> 
> 대부분의 코드는 react-query 인강에 나오는 코드를 사용하였고, 그 이외의 이해를 돕기위한 코드는 react-query 공식 문서에 나오는 코드를 사용하였습니다.
> 
> [인강에 나오는 코드 레파지토리](https://github.com/tannerlinsley/react-query-essentials)
> 
> [react-query 공식문서](https://react-query.tanstack.com/overview)
> 

<br/>
<br/>

## 1. Basic query

- useQuery('uniqueKey', api function )
- useQuery에 uniqueKey가 있어야 하고 중복되면 안된다
    
    ```jsx
    const queryInfo = useQuery('pokemon', () =>
        axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      )
    ```
    

## 2. Loading, Error state

- 로딩, 에러 상태
- 리액트 쿼리는 기본적으로 useQueryf 를 썼을 때 isLoading과 isError 값을 가지고 있다
    
    ```jsx
    const { data, isLoading, isError } = useQuery('uniqueKey', getSomething)
    ```
    
    ```jsx
    const queryInfo = useQuery('pokemon', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // if (true) {
        //   throw new Error('Test error!')
        // }
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      })
    
      return queryInfo.isLoading ? ( //로딩 처리
        'Loading...'
      ) : queryInfo.isError ? ( //에러 처리
        queryInfo.error.message
      ) : (
        <div>
          {queryInfo.data.map(result => {
            return <div key={result.name}>{result.name}</div>
          })}
        </div>
      )
    
    ```
    

## 3. refetching queries on window focus

- 다른 탭이나 다른 창에서 무언가를 하다가 다시 돌아왔을 때 윈도우가 포커스 되면 리액트 쿼리는 그 값들을 다시 조회한다
- 기본값은 true 이고 false로 바꾸고 싶다면 설정 값을 추가하면 된다,
    
    ```jsx
      const queryInfo = useQuery(
        'pokemon',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          return axios
            .get('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.data.results)
        },
        {
          refetchOnWindowFocus: false,
        }
      )
    ```
    

## 3. isFetching

- 위에서 윈도우에 포커스가 됐을 때 사용자는 화면 뒤에서 무슨 일이 벌어지고 있는지 모르기 때문에 isFetching 이라는 값을 이용해 데이터가 업데이트 중임을 표시할 수 있다
    
    ```jsx
    const queryInfo = useQuery('pokemon', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      })
    
      return (
        <div>
          {queryInfo.isFetching ? 'Updating...' : null}
        </div>
      )
    }
    
    ```
    

## 4. Stale time

**Stale time : fresh -> stale 한 상태로 변경되는데 걸리는 시간**

- useQuery나 useInfiniteQuery는 기본적으로 cashe 된 데이터를 stale이라고 여긴다, stale한 query는 아래의 조건이 되면 자동적으로 refetch한다
    - automatically Refetch 조건
        - New instances of the query mount
        - The window is refocused
        - The network is reconnected.
        - The query is optionally configured with a refetch interval.
- staleTime을 설정하면 그 시간동안 query의 상태가 fresh 상태로 되기 때문에 재조회를 하지 않는다
- default : 0 , global로 설정 가능하다
    
    ### **staleTime의 type**
    
    ```jsx
    staleTime: number | Infinity
    ```
    
    - 사용법
    
    ```jsx
    const queryInfo = useQuery(
        'pokemon',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          return axios
            .get('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.data.results)
        },
        {
          staleTime: Infinity, //staleTime: 5000
        }
      )
    
    ```
    

## 5. Cache Time

**Cache Time : `inactive` (미사용, 비활성) 상태일 때 cache 된 상태로 메모리에 남아있는 시간**

- inactive 상태일 때 cache time 이후 garbage 로 들어간다
- cache time 일 때 쿼리를 재조회 하면 재조회 하는 동안 이전에 캐시된 데이터를 보여준다 (isFetching 활성화)
- cache time 이 끝나고 재조회 하면 처음부터 쿼리를 다시 조회한다 (isLoading 활성화)
- cache time : infinity 는 cache time을 비활성화 한다는 뜻이다
    
    ### cacheTime type
    
    ```jsx
    cacheTime: number | Infinity
    ```
    
    사용법
    
    ```jsx
    const queryInfo = useQuery(
        'pokemon',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          return axios
            .get('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.data.results)
        },
        {
          cacheTime: Infinity,
        }
      )
    ```
    

## 6. Query key 와 caching

- 같은 내용이라도 서로 다른 query Key 로 했을 경우
    - request 두 번 요청
    - 서로 다른 값으로 캐싱
- 서로 같은 query Key 로 설정했을 경우
    - 2개의 instance
    - request 한 번
    - 이 쿼리는 한 값으로 캐싱된다
    
    ```jsx
    export default function App() {
      return (
        <div>
          <Pokemon queryKey="pokemon1" />
          <!-- <Pokemon queryKey="pokemon1" /> -->
          <Pokemon queryKey="pokemon2" />
          <ReactQueryDevtools />
        </div>
      )
    }
    
    function Pokemon({ queryKey }) {
      const queryInfo = useQuery(queryKey, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      })
    
      return queryInfo.isLoading ? (
        'Loading...'
      ) : queryInfo.isError ? (
        queryInfo.error.message
      ) : (
        <div>
          {queryInfo.data.map(result => {
            return <div key={result.name}>{result.name}</div>
          })}
          <br />
          {queryInfo.isFetching ? 'Updating...' : null}
        </div>
      )
    }
    ```
    

## 7. Custom hook으로 쿼리 재사용 하기

- 앱이 커지다 보면 동일한 데이터 조회를 여러 컴포넌트에서 사용해야 할 때가 있다.
- custom hook을 만들어 여러 컴포넌트에서 동일한 키를 가진 리액트 쿼리를 사용하는 방법이다. (동일한 key 로 여러 요청을 만들어도 된다. 하나의 요청으로 인식하니까 그렇게 써도 되긴 하는데, 그렇게 하면 코드가 중복되고 나중에 유지보수 하기 힘들다)
- custom hook
    
    ```jsx
    function usePokemon() {
      return useQuery('pokemons', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      })
    }
    ```
    
- count.tsx
    
    ```jsx
    function Count() {
      const queryInfo = usePokemon()
    
      return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
    }
    ```
    
- Pocketmon.tsx
    
    ```jsx
    function Pokemon() {
      const queryInfo = usePokemon()
    
      return queryInfo.isLoading ? (
        'Loading...'
      ) : queryInfo.isError ? (
        queryInfo.error.message
      ) : (
        <div>
          {queryInfo.data.map(result => {
            return <div key={result.name}>{result.name}</div>
          })}
          <br />
          {queryInfo.isFetching ? 'Updating...' : null}
        </div>
      )
    }
    ```
    

## 8. 병렬 쿼리(Paraller Query)

병렬로 쿼리 요청을 하기 위해서는 별다른 처리가 필요하지 않다. 그냥 쿼리를 나열해주면 된다.

- 단, suspense 모드에서 사용할 경우 parallelism패턴이 동작하지 않으므로(첫 쿼리가 실행될 때 promise를 던지고 다른 쿼리가 실행되기 전까지 컴포넌트를 일시 중단한다) `useQueries` 를 사용하는 것을 추천한다.

예시코드

```jsx
 function App () {
   // The following queries will execute in parallel
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

## 9. 쿼리에서 Props와 State 사용하기 (Using Props and State in Queries)

props와 state 사용

옵셔널 체이닝으로 유효한지 검사 후 props를 뿌려주면 된다.

```jsx
... //상위 컴포넌트 
const [pokemon, setPokemon] = React.useState('')
...

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(pokemon, async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.data)
  })

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ) : (
        'Pokemon not found.'
      )}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}
```

## 10. 쿼리 비활성화 시키기(Disabling Queries)

위 예시와 같이 이런 식으로 요청을 보내면 초기 상태인 '' 값으로 요청이 가게 된다.

그것을 해결하려면 enabled 속성값을 추가해 pocketmon 이 있을 때만 실행되게 해주면 된다.

```jsx
const queryInfo = useQuery(
    pokemon,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.data)
    },
    {
      enabled: pokemon,
    }
  )
```

## 11. 다중 쿼리 키 (Multi-part Query Keys)

쿼리 키를 `const queryInfo = useQuery(pokemon, async...)` 라고 쓰면 `onchange` 로 검색할 때마다 `pokemon` 변수에 따라 새로운 `key` 가 생성되기 때문에 검색어가 쌓일수록 혼란스러워 진다.

```jsx
export default function App() {
  const [pokemon, setPokemon] = React.useState('')
  return (
    <div>
      <input value={pokemon} onChange={e => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
      <ReactQueryDevtools />
    </div>
  )
}

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    ['pokemon', pokemon], // AS IS : pokemon
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.data)
    },
    {
      enabled: pokemon,
    }
  )
```

이런식으로 된다.

```jsx
['charizrd']
['pikachu']
```

그래서  `array` 를 사용해 prefix로 'pokemon'을 넣어주면 devtools에 조금 더 유기적으로 보인다..

```jsx
['pokemon', 'charizrd']
['pokemon', 'pikachu']
```

array key 에 대한 내용은 이 블로그를 참고해 보자,,  refetch할 때의 팁과, 쿼리키를 관리하는 방법까지 설명하는 블로그 글이다

[https://tkdodo.eu/blog/effective-react-query-keys#structure](https://tkdodo.eu/blog/effective-react-query-keys#structure)

## 12. 자동 Automatic Query Retries

react-query는 요청이 실패하면 자동으로 3번 retry 한다

`retry` 에 재시도 할 횟수를 설정할 수 있다. `false` 나 `0` 을 설정할 경우 `retry` 하지 않는다

`retryDelay` 를 설정해 재시도 할 때 delay 시간을 설정할 수 있다

```jsx
const queryInfo = useQuery(
    ['pokemon', pokemon],
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.data)
    },
    {
      retry: 2,
      retryDelay: 1000,
      enabled: pokemon,
    }
  )
```

## 13. 쿼리 취소 Query Cancellation

`[AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)` 와 `fetch API` 를 사용한다

- promise가 resolve 되기 전에 언마운트되거나 사용되지 않는 쿼리는 취소되지 않는다.
- promise가 resolve 된 후에 데이터를 캐시해서 사용할 수 있다.

```jsx
function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    ['pokemon', pokemon],
    () => {
      const controller = new AbortController()

      const signal = controller.signal

      const promise = new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            method: 'get',
            signal,
          })
        })
        .then(res => res.json())

      promise.cancel = () => {
        controller.abort()
      }

      return promise
    },
    {
      enabled: pokemon,
    }
  )
```

- `Axios` 를 활용해서 취소할 수도 있다 [(이전 방법)](https://react-query.tanstack.com/guides/query-cancellation#old-cancel-function)

## 14. 의존적인 쿼리 Dependent Queries

- 한 쿼리가 다른 쿼리에 의존하는 경우 (userQuery의 값을 받아 → postQuery 순으로 요청을 해야할 때
- isIdle은 enabled가 true이고 쿼리 시작할 때 true 이고 그 다음 isLoading단계로 이동한다.
- isIdle이 아닌 isLoading으로 체크를 하게 되면 에러난다

```jsx
import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

const email = 'Sincere@april.biz'

function MyPosts() {
  const userQuery = useQuery('user', () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then(res => res.data[0])
  )

  const postsQuery = useQuery(
    'posts',
    () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data.id}`
        )
        .then(res => res.data),
    {
      enabled: userQuery.data?.id,
    }
  )

  return userQuery.isLoading ? (
    'Loading user...'
  ) : (
    <div>
      User Id: {userQuery.data.id}
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        'Loading posts...'
      ) : (
        <div>Post Count: {postsQuery.data.length}</div>
      )}
    </div>
  )
}
```

## 15. Supplying a Query with Initial Data

initialData를 options을 설정하면 초기 데이터를 설정하고 초기 로딩 상태를 건너 뛸 수 있다

초기에 설정할 수 있는 데이터가 있을 때 사용

```jsx
function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     initialData: initialTodos,
   })
 }
```


## 16. Marking Initial Query data as Stale

initialData 와 staleTime options을 설정하면 설정한 시간동안 refetch하지 않을 수 있다. (기본값은 0)

```jsx
function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     initialData: initialTodos,
     staleTime: 1000,
   })
 }
```

## 17. Querying Related Lists and Items

list에 관련된 item 을 불러오는 쿼리 

posts → post 를 불러온다고 예를 들었을 때

postId로 각각의 불러오기 때문에 postId로  `complex key`를 사용한다.

```jsx
  const postQuery = useQuery(['post', postId], () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.data)
  })
```

## 18. Seeding Initial Query Data from Other Queries

 posts 의 목록을 조회 한 후 id로 post를 다시 가지고 올 때 먼저 조회한 posts의 데이터를 `queryCache`에서 가지고 와서 `initialData` 로 설정할 수 있다.

`queryCache.getQueryData('posts')` 

```jsx
const postQuery = useQuery(
    ['post', postId],
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.data)
    },
    {
      initialData: () =>
        queryCache.getQueryData('posts')?.find(post => post.id === postId),
    }
  )
```

## 19. Using Query Data to Seed Future Queries

나중에 쓸 데이터를 위해 캐싱하기

`post`의 목록을 조회하고 나중에 `['post', post.id]` 로 조회하는 `query`를 위해 `queryCache`에 `setQueryData`로 캐싱해 둔다

```jsx
const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const posts = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)

    posts.forEach(post => {
      queryCache.setQueryData(['post', post.id], post)
    })

    return posts
  })
```

## 20. Query Side-Effects

- useQuery의 `side-effect`를 위한 `callback option`들이 있다.
- `onSuccess` : 성공적으로 새 데이터를 가지고 올 때
- `onError` : 에러일 때 실행
- `onSettled` : 성공, 에러 둘다 실행, 성공시엔 `error`가 `undefined`, 실패 시엔 `data`가 `undefined`

```jsx
const postsQuery = useQuery('posts', fetchPosts, {
    onSuccess: data => {
    ****},
    onError: error => {
		},
    onSettled: (data, error) => {
		},
  })
```

## 21. Scroll Restoration

- `Scroll Restoration`: 뒤로가기를 누르면 이전에 방문한 페이지의 스크롤 위치로 가는 것, client side rendering이 되면서 퇴행했다고 한다.
- react-query에서는 기본 값. 쿼리 결과가 캐시되고, 쿼리가 렌더링 될 때 동기적으로 찾을 수 있기 때문.
- garbage 가 수집되지 않는 한 Scroll Restoration은 기본값이다.
- garbage 수집 설정은 cacheTime으로 가능하고, 기본값은 5분이다

```jsx
const postsQuery = useQuery('posts', fetchPosts, {
      cacheTime: 10000,
	})
```

## 22. Query Polling with Refetch Intervals

- 일정 간격마다 서버에 요청하기
- `refetchInterval` : 서버에 요청할 시간 간격
- `refetchIntervalInBackground` : 열려있는 탭이 활성화 되어 있으라 때에도 요청할 건지 여부 기본값은 `false`

```jsx
const timeQuery = useQuery(
    'posts',
    async () => {
      return axios.get('/api/time').then(res => res.data)
    },
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  )
```