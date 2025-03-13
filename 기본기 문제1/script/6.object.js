/**
 * 
**문제:**  
다음과 같은 정보를 담은 객체를 만들고, 각 속성을 출력하세요.

plaintext

복사편집

`이름: 홍길동   나이: 25   직업: 개발자   거주지: 서울`  

 */

const obj = {
    name: '홍길동',
    age: 25,
    job: '개발자',
    address: '경기도 화성시 새비봉서로'
};

document.write('name: ' + obj.name 
    + '<br>' + 'age: ' + obj.age 
    + '<br>' + 'job: ' + obj.job 
    + '<br>' + 'address: ' + obj.address);