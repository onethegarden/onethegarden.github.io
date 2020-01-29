---
layout: post
title: HTML form
---



html form의 input태그 제어


```html
    <form name="myForm">
        <input type="text" id ="id1" name="name1"  value="dd"/>
    </form>
```


```javascript
        console.log(document.myForm.name1.value);
        console.log(document.myForm.id1.value);
        console.log(document.myForm.elements['id1'].value);
        console.log(document.myForm.elements['name1'].value);
```