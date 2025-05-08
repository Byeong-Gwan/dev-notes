/**
 * 9.
#### **9. 객체 배열 정렬 (고급)**
    💡 다음과 같은 객체 배열이 있을 때, `age` 값을 기준으로 **오름차순 정렬**하는 코드를 작성하세요.

    `var people = [   { name: "철수", age: 30 },   { name: "영희", age: 25 },   { name: "민수", age: 35 },   { name: "지혜", age: 28 } ];`

    📌 `sort()`를 활용하세요.
 */

    const people = [   
        { name: "철수", age: 30 },   
        { name: "영희", age: 25 },   
        { name: "민수", age: 35 },   
        { name: "지혜", age: 28 } 
    ];

    let result = [];
    result = people.sort( (a, b) => a.age - b.age);
    console.log(people);
    console.log('result', result);

    document.writeln('obj: ', JSON.stringify(result)); 