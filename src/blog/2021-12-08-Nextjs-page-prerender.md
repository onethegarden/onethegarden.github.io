---
layout: post
categories: ['Next']
title: 번역 Next.js 의 page, pre-render
---

[https://nextjs.org/docs/basic-features/pages](https://nextjs.org/docs/basic-features/pages) 를 번역한 내용입니다.

## Page

> 이 문서는 Next.js 버전 9.3 이상을 위한 것입니다. 이전 버전의 Next.js를 사용하는 경우 [이전 설명서](https://nextjs.org/docs/tag/v9.2.2/basic-features/pages)를 참조하세요
> 

Next.js에서는 page는 `page` 디렉토리에서  `.js`, `.jsx`, `.ts` 또는 `.tsx` 파일로 export된  **React component** 입니다. 각 페이지는 파일 이름을 기반으로 하는 경로와 연결됩니다.

**예시** : 아래와 같이 React component에서 `pages/about.js` 를 만들어 export 하면, `/about` 에 접근할 수 있습니다.

```jsx
function About() {
  return <div>About</div>}

export default About
```

### Dynamic Routes 와 페이지

Next.js는 Dynamic Routes 가 있는 페이지를 지원합니다. 예를들어 `pages/posts/[id].js`파일을 만드는 경우,  `posts/1`, `posts/2` 에 접근할 수 있습니다.

> Dynamic Routes 에 대해 자세히 알아보려면  [Dynamic Routing documentation](https://nextjs.org/docs/routing/dynamic-routes) 를 확인하세요 .
> 

## Pre-rendering

`Next.js`는 모든 페이지를 **미리 렌더링** 합니다. 즉, `Next.js`는 클라이언트 측 `JavaScript`로 모든 작업을 수행하는 대신 각 페이지에 대해 미리 `HTML`을 생성합니다. `Pre-rendering`은 `더 나은 성능`과 `SEO`를 할 수 있게 합니다.

생성된 각 `HTML`은 해당 페이지에 필요한 최소한의 `JavaScript` 코드와 연결됩니다. 브라우저에서 페이지를 로드하면 해당 `JavaScript` 코드가 실행되고 페이지가 완전히 `interactive` 하게 만들어집니다. (이 과정을 *`hydration`* 라고 *합니다* )

### 두 가지 형태의 Pre-rendering

`Next.js`에는 **`Static Generation`** 과 **`Server-side Rendering`** 두 가지의 `Pre-rendering` 형식이 있습니다. 

차이점은 페이지에 대한 `HTML`을 언제 생성하느냐 입니다.

- `Static Generation(권장)` : 빌드 시 `HTML` 이 생성되고, 각 요청에 사용됩니다.
- `Server-side Rendering` : 각 요청에 대해 `HTML` 이 생성됩니다.

중요하게도 Next.js를 사용하면 각 페이지에 사용할 `pre-rendering` 방법을 선택할 수 있습니다 . 대부분의 페이지에는 `Static Generation` 을 사용하고 다른 페이지에는 `Server-side Rendering`을 사용하여 `"hybrid"` Next.js 앱을 만들 수 있습니다.

우리는 성능상의 이유로 서버 측 렌더링을 통해 `Static Generation` 를 사용하는 것을 권장합니다. 정적으로 생성된 페이지는 성능 향상을 위한 추가 설정 없이 CDN에서 캐시 처리 할 수 있습니다. 그러나 어떤 경우에는 서버 측 렌더링이 유일한 옵션일 수 있습니다.

 `Static Generation` 또는 `Server-side Rendering` 과 함께 `Client-side Rendering`을 사용할 수도 있습니다 . 즉, 페이지의 일부는 클라이언트 측 JavaScript로 완전히 렌더링될 수 있습니다. 자세한 내용은 [데이터 가져오기](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) 문서를 참조하세요.

## Static Generation(권장)

페이지가 `Static Generation` 을 사용하는 경우 페이지 HTML은 **빌드 시** 생성됩니다. 즉, 프로덕션에서  `next build` 를 실행할 때 페이지 HTML이 생성됩니다. 이 HTML은 각 요청에서 재사용됩니다. CDN에서 캐시 처리 할 수 있습니다.

Next.js에서는 **데이터가 있거나 없는** 페이지를 정적으로 생성할 수 있습니다 . 각각의 경우를 살펴봅시다.

### 데이터 없는 Static Generation

기본적으로 Next.js는 데이터를 가져오지 않고 정적 생성을 사용하여 페이지를 미리 렌더링합니다. 다음은 예시입니다.

```jsx
function About() {
  return <div>About</div>
}

export default About
```

이 페이지는 미리 렌더링할 외부의 데이터를 가져올 필요가 없습니다. 이럴 때 Next.js는 빌드 시 페이지당 하나의 HTML 파일을 생성합니다.

### 데이터 있는 Static Generation

일부 페이지는 사전 렌더링을 위해 외부에서 데이터를 가져와야 합니다. 두 가지 시나리오가 있으며 하나 또는 둘 다 적용할 수 있습니다. 각각의 경우에 Next.js가 제공하는 다음 기능을 사용할 수 있습니다.

- 페이지 `content`가 데이터에 따라 다릅니다 : `getStaticProps` 를 사용하십시오.
- 페이지의 `path`가 데이터에 따라 다릅니다 : `getStaticPaths` 를 사용하십시오. (일반적으로  `getStaticProps` 에 추가적으로 사용합니다.)

**Scenario 1: 페이지 내용이 외부 데이터에 의존**

**예** : 블로그 페이지는 CMS(content management system)에서 블로그 게시물 목록을 가져와야 할 수 있습니다.

```jsx
// TODO: 이 페이지가 pre-render 하기 전에 
//       `posts`데이터 가지고 오기 (API endpoint를 호출해서)
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```

`Pre-rendering` 에서 이 데이터를 가져오기 위해 Next.js는 동일한 파일에서 `getStaticProps` 라는 `async`함수를 `export` 할 수 있게 허용합니다. 이 함수는 빌드 시 호출되며 fetch된 데이터를 사전렌더링 시  페이지에 `props` 를 전달할 수 있습니다.

```jsx
function Blog({ posts }) {
  // posts를 렌더링 한다..
}

// 이 함수는 빌드 시에 호출됩니다.
export async function getStaticProps() {
  // posts 를 가져오기 위한 API endpoint
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Blog component에 { props: { posts } } 로 리턴합니다
  // 빌드 시에 `posts`를 props로 받을 수 있습니다
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

`getStaticProps` 가 어떻게 동작하는지 더 알고 시다면 [Data Fetching documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) 문서를 확인하세요

**Scenario 2: Your page paths depend on external data**

Next.js는 **dynamic routes**로 페이지를 만들 수 있습니다. 예를들어,  `pages/posts/[id].js`  이런 파일을 만들어서 `id` 에 베이스를 둔 하나의 블로그 페이지를 보여줄 수 있습니다. 이것은 `posts/1` 로 접근했을 때  `id:1` 인 블로그를 보여줄 수 있게 합니다

> dynamic routing에 대해 더 알고 싶다면, [Dynamic Routing documentation](https://nextjs.org/docs/routing/dynamic-routes) 를 확인하세요.
> 

그러나 빌드 시 사전 렌더링하려는 `id` 항목은 외부 데이터에 따라 다를 수 있습니다.

예시 : 데이터베이스에 하나의 블로그 게시물(`id: 1` ) 만 추가했다고 가정 합니다. 이 경우 빌드 시에 `posts/1` 만 pre-render 하기 원할 것 입니다.

나중에, `id:2` 로 된 두 번째 포스트를 추가합니다. 그러면  `posts/2` 도 pre-render 되기를 원할 것이죠.

따라서 pre-render 되는 페이지 **경로**는 외부 데이터에 따라 달라집니다**.** 이를 처리하기 위해 Next.js 는 dynamic page(이번 경우에는 `pages/posts/[id].js` )에서 `getStaticPaths` 라는 `async`함수를 `export` 하여 사용할 수 있게 합니다. 이 함수는 빌드 시에 호출되고 pre-redner 할 path를 정할 수 있습니다.

```jsx
// 이 함수는 빌드 시에 호출됩니다.
export async function getStaticPaths() {
  // Cposts 를 가져오기 위한 API endpoint
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // posts기반의 prerender 할 path 가져오기
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // 우리는 빌드 시에만 이 paths를 pre-render 할 것입니다.
  // { fallback: false } 는 다른 경로는 404인 것을 의미합니다.
  return { paths, fallback: false }
}
```

또한 `pages/posts/[id].js` 에서, `id` 로 데이터를 가지고 오고 페이지를 pre-render 하여 사용할 수 있게 하기 위해 `getStaticProps` 를 export 해야 합니다.

```jsx
function Post({ post }) {
  // posts를 렌더링 한다..
}

export async function getStaticPaths() {
  // ...
}

// 이 함수는 빌드 시에 호출됩니다.
export async function getStaticProps({ params }) {
  // params 은 post `id`를 가지고 있습니다.
  // 라우트가 /posts/1 이면 params.id 는 1 입니다.
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // 페이지에 props에 post 데이터 넣어주기
  return { props: { post } }
}

export default Post

```

 `getStaticPaths` 이 동작하는 방법에 대해 더 알고 싶다면,  [Data Fetching documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 를 확인하세요.

## Static Generation을 언제 사용해야 합니까?

페이지를 한 번 build해서 CDN에서 제공할 수 있으므로 모든 요청에 대해 서버가 페이지를 렌더링하도록 하는 것보다 훨씬 빠르기 때문에 가능 하면 **Static Generation**(데이터가 있을 때도, 없을 때도)을 사용하는 것이 좋습니다 .

다음을 포함한 다양한 유형의 페이지에 대해 **Static Generation**을 사용할 수 있습니다.

- 마케팅 페이지
- 블로그 포스트와 포트폴리오
- E-commerce 제품 목록
- 도움말과 문서

스스로에게 물어보세요 : "사용자의 요청 이전에 페이지를 pre-render 할 수 있나?" 만약 대답이 "네" 라면, Static Generation을 사용해야 합니다.

반면에 만일 사용자의 요청 전에 pre-render 할 수 없다면 Static Generation은 좋은 아이디어가 아닙니다. 아마 그 페이지는 빈번한 데이터 없데이트가 일어나고, 페이지의 내용은 매 요청마다 바뀔 것입니다.

만약 이런 케이스라면, 다음 중 하나를 사용 할 수 있습니다.

- Static Generation 를 **Client-side Rendering** 와 함께 사용 : 페이지의 일부는 pre-render를 건너뛰고 클라이언트 측 JavaScript를 사용하여 렌더링 할 수 있습니다. 이 접근 방식에 대해 더 알아보려면 [Data Fetching documentation](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) 를 확인하세요.
- **Server-Side Rendering** 사용 : Next.js는 각 요청 페이지를 미리 렌더링합니다. 페이지를 CDN으로 캐시할 수 없기 때문에 속도가 느려지지만 미리 렌더링된 페이지는 항상 최신 상태입니다. 이 접근 방식에 대해 아래에서 이야기할 것입니다.

## Server-side Rendering

> "SSR" 이나 "Dynamic Rendering" 이라고도 불려집니다.
> 

**Server-side Rendering** 을 페이지에 사용하면, 각 요청에 따라 page HTML이 생성됩니다.

page에서 Server-side-Rendering을 사용하기 위해, `async` 함수인  `getServerSideProps` 를 export 해야 합니다. 이 함수는 매 요청마다 서버에서 호출됩니다.

예를들어, 페이지에서 자주 업데이트되는 데이터(외부 API에서 가져옴)를 미리 렌더링해야 한다고 가정합니다.   데이터를 가져와 아래와 같이 `Page` 에 전달할 수 있는 `getServerSideProps` 를 사용할 수 있습니다.

```jsx
function Page({ data }) {
  // data를 렌더링 한다..
}

// 매 요청마다 호출된다 
export async function getServerSideProps() {
  // data 를 가져오기 위한 API endpoint
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // 페이지에 props에 post 데이터 넣어주기
  return { props: { data } }
}

export default Page
```

보시는 것 처럼,  `getServerSideProps`은 `getStaticProps`와 비슷합니다, 하지만 차이점은 `getServerSideProps` 는 빌드 시간이 아니라 모든 요청 마다 실행 된다는 것입니다.

`getServerSideProps` 이 동작하는 방법에 대해 더 알아보려면 [데이터 가져오기 문서를](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) 확인하세요

## Summary

우리는 Next.js의 두 가지 형태의 pre-rendering에 대해 알아봤습니다.

- Static Generation**(권장):** HTML은 빌드 시 생성되고 각 요청에서 재사용됩니다. Static Generation을 사용해서 page를 만들려면 page component를 export 하거나 `getStaticProps` (필요한 경우 `getStaticPaths` 도)를 export 합니다. 사용자의 요청에 앞서 미리 렌더링할 수 있는 페이지에 적합합니다. 또한, Client-side-Rendering 과 함께 사용하여 추가적인 데이터도 가지고 올 수 있습니다.
- **Server-side Rendering: 각 요청마다** HTML이 생성됩니다. page를 Server-side Rendering으로 만들고 싶으면 `getServerSideProps` 를 export 하면 됩니다. Server-side Rendering 은 Static Generation에 비해 느리기 때문에, 반드시 필요한 경우에만 사용해야 합니다.