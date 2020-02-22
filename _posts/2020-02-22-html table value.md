---
layout: post
title: html td value 
---


**HTML get td value**

this.innerText로 가지고 올 수 있다.
this.value로는 undefine이 뜸

```html
 <table>
        <tr>
            <td onclick="print(this.innerText)">
                something
            </td>
        </tr>
    </table>
    
    <script>
    function print(value){
        console.log(value);
    }
    </script>    
```

