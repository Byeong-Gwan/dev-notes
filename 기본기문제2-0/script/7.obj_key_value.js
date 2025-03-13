/**
 * 
 **문제 7: 객체의 키와 값 출력**

 * 다음 객체의 모든 키와 값을 출력하는 프로그램을 작성하세요.

    javascript

    <복사편집>

    `const person = {   name: '홍길동',   age: 30,   job: '개발자' };`
 */

    const person = {   name: '홍길동',   age: 30,   job: '개발자' };
    console.log('person', person.name);

    // person 에 객체내에 있는 key값 만큼 반복해서 vlaue 값을 가져온다.
    for (let key in person) {
        console.log('person', person);
        document.write(person[key]);
        document.write('<br>');
    }
