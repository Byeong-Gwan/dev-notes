/**
 * 
 * ### 3. **객체 배열 정렬**

    // 사람 목록을 나이(age) 기준으로 오름차순 정렬하라.
    // 입력: [{name: "철수", age: 32}, {name: "영희", age: 24}, {name: "민수", age: 27}] 
    // 출력: [{name: "영희", age: 24}, {name: "민수", age: 27}, {name: "철수", age: 32}]

 */

    const obj = [{name: "철수", age: 32}, {name: "영희", age: 24}, {name: "민수", age: 27}];
    console.log(objArrSort(obj));

    function objArrSort (obj) {
        return [...obj].sort((a, b) => a.age - b.age);
    }