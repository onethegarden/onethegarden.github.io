---
layout: post
title: Javascript optional-chaining
---

# **javascript optional chaining**

 



### Optional chaining

- new javascript operators.
- code look more clear





1. #### before optional-chaining

```javascript

{data? && data.movie? && data.movie.title : "" }

```

​	we have many more levels to check. usually we use ```&&``` operator to  avoid getting error when data is null or undefined





2. #### optional-chaining

```javascript

{data?.movie?.title}

```

if data  or  data.movie is null or undefined, returns undefined rather than throwing an exception.

we can use ```?.``` instead of adding ```&&``` operator




출처 : https://blog.logrocket.com/optional-chaining-and-nullish-coalescing-in-javascript/