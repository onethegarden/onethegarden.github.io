---
layout: post
title: React How works
---

## How react works browsesr


react create all these element
pushes that into html



**INDEX HTML**
```html
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
```


**INDEX JS**
```javascript

ReactDOM.render(<App />, document.getElementById('root'));
```


**APP JS**


```javascript
function App() {
  return (
    <div className="App">
     hello
    </div>
  );
}
```


application load empty html first,
react is trying to put that js component into element by id 'root'


component : function that return HTML
JSX : JS+HTML




