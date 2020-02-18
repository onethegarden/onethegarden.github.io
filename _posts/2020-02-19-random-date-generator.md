---
layout: post
title: Js random date generator
---


**Random date generator**



```javascript
function randomDate(start, end){
    //랜덤날짜
    var date = new Date(start.getTime()+Math.random()*end.getTime()-start.getTime());
    //YYYY-MM-DD format
    var year = date.getFullYear();
    var month = 1+date.getMonth();
    month = month>=10?month:'0'+month; //MM
    var day= day.getDate();
    day = day>=10?month:'0'+day;

    return year + '-' + month + '-' + day;
}


console.log(randomDate(new Date(2001,0,1), new Date()));

```





출처 : https://gist.github.com/miguelmota/5b67e03845d840c949c4