---
layout: post
title: React router
---

##React router
 - changing page using React
 - cant using navigation outside Router


**App.js**

```javascript
function App(){
  //exact means only rendering path
  return(
    <HashRouter>
      <Navigation/>
       <Route path = "/" exact={true} component={Home}/>
       <Route path = "/about" component={About}/>
    </HashRouter>
  );
}
```



**Navigation.js**


```javascript
function Naviation(){
    return (
    <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </div>
    );
}
```
html refresh page, react die




instead of 'a' and 'href', we have to use 'Link' and 'to'

```javascript
import {Link} from 'react-router-dom';

function Naviation(){
    //link has to be inside router
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </div>
    );
}
```