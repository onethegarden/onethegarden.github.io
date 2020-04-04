 ---
layout: post
title: Java ConcurrentModificationException
---


##ConcurrentModificationException 


>This exception may be thrown by methods that have detected concurrent modification of an object when such modification is not permissible.



예시코드 


``` java

ArrayList<Member> memberList = dao.retreiveMember(param);

//Error
for(Memver vo : memberList){
    if(vo.getName.equals("jeongwon")){
        vo.setMember("awesomeJeongwon");
    }
    memberList.add(vo);
}

//success
ArrayList<Member> memberList = dao.retreiveMember(param);
ArrayList<Member> returnList = new ArrayList();

for(Memver vo : memberList){
    if(vo.getName.equals("jeongwon")){
        vo.setMember("awesomeJeongwon");
    }
    returnList.add(vo);
}


```



- iterator가 object 서치하고 있을 때 수정된 걸 발견하였을 때 이셉션 발생

- 서로 다른 스레드가 돌아가면서 생기는 문제

- list를 순회하는 중에 add를 하면 무한 for문

- 임시 리스트 만들어서 넣어줘야함.





출처 : https://docs.oracle.com/javase/7/docs/api/java/util/ConcurrentModificationException.html