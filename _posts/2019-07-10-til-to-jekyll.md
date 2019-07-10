---
layout: post
title:  "2019-07-10 today i learned"
date:   2019-07-11 19:17:00 +0700
categories: [oracle, css]
---


## 1. [Oracle]

<H4>문제풀이</H4>
<P>
    --20. '아타트롤' 도서 작가와 역자를 표시하는 SQL 구문을 작성하시오. (결과 헤더는
--‘도서명’,’저자’,’역자’로 표시할 것)<BR><BR>
    다른 테이블의 같은 컬럼 조인하기
</p>

<code>select book_nm,w.writer_nm ,w1.writer_nm <br>from tb_book_translator t<br> 
join TB_book_author a using(book_no)
<br>join tb_book  using(book_no)
<br>join tb_writer w on(w.writer_no=a.writer_no)
<br>join tb_writer w1 on (w1.writer_no=t.writer_no)<br>
where book_nm='아타트롤';</code>









## 2. [CSS]



문단스타일
텍스트정렬 

- text-align : left | right | center | justify
justify정렬
- text-justify : auto | none | inter-word | distribute
text-indent : <크기>|<백분율>








