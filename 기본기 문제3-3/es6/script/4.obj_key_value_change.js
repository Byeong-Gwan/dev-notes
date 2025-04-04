/**
 * 
**📝 문제:**  
객체의 키와 값을 **서로 뒤바꾼 새로운 객체를 반환하는 함수**를 만들어라.

    **✔ 조건:**

    - `for`문과 객체 `{}`를 활용할 것
        

    **🔹 입력 예시:**

    `console.log(swapKeyValue({ a: 1, b: 2, c: 3 }));`

    **🔹 출력 예시:**

    `{ "1": "a", "2": "b", "3": "c" }`

 */
    
    console.log(swapKeyValue({ a: 1, b: 2, c: 3 }));

    // es6 version
    const swapKeyValue2 = (obj) => 
        Object.entries(obj).reduce((acc, [key, value]) => ({...acc, [value]: key}), {});

    console.log(swapKeyValue2({ a: 1, b: 2, c: 3 }));

    