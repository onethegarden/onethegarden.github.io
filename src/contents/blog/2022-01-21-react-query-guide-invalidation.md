---
layout: post
categories: ['react-query', 'React']
path: react-query-invalidation
title: react-query guide - Invalidation
---

## 1. Query Invalidation Basics

`invalidateQuries` 는 쿼리를 무효화하고 다시 `fetch` 데 사용할 수 있다 

쿼리를 유효하지 않은 것으로 표시하고 활성화된 쿼리를 background에서 refetch 한다

무효화 시킬 query key를 넣어주면 된다

```jsx
queryCache.invalidateQueries('random')
```

## 2. Invalidation Without Refetching Active Queries

활성화된 쿼리를 `refetching` 없이 `invalidate` 시키기 

활성화된 쿼리가 `refetch` 되는 것을 원하지 않고, `invalid` 된 것으로 표시하고 싶은 경우 사용

아래 예시는 `refetchActive: false` 로 설정해서 window 에 다시 focus 됐을 때 쿼리를 가져오지 못하는데, `Invalidate Random Number` 버튼을 클릭하면 query의 상태를 무효화 시켜, window에 다시 focus 하면 refetch 할 수 있다

```jsx
export default function Posts() {
  const randomQuery = useQuery(
    'random',
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
      <div>
        <button
          onClick={() =>
            queryCache.invalidateQueries('random', {
              refetchActive: false,
            })
          }
        >
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
```

## 3. Invalidating & Refetching Inactive Queries

`refetchInactive: true` 를 사용하면 비활성화된 쿼리도 다시 가져온다

```jsx
queryCache.invalidateQueries('random', {
  refetchInactive: true,
})
```

## 4. Invalidating Multiple Queries with Similar Query Keys

complex key 를 사용할 때 `invalidateQueries` 는 `prefix` 로 해당하는 쿼리들을 `invalidate` 시킬 수 있다

ex) `queryCache.invalidateQueries('random')`  → `['random', subKey]` 모두 invalidate

    `queryCache.invalidateQueries(['random', 'A'])` → `['random', 'A']` 만 invalidate

여러개의 posts 나 todos 를 관리하는 데 사용하면 좋을 것이라고 한다

```jsx
export default function App() {
  return (
    <div>
      <button onClick={() => queryCache.invalidateQueries('random')}>
        Invalidate Random Number
      </button>
      <RandomNumber subKey="A" />
      <RandomNumber subKey="B" />
      <RandomNumber subKey="C" />
    </div>
  )
}
```

```jsx
const randomQuery = useQuery(
    ['random', subKey],
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )
```