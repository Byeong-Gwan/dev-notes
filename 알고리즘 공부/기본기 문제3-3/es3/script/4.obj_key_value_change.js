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
    // es3 version 
    console.log(swapKeyValue({ a: 1, b: 2, c: 3 }));

    function swapKeyValue (obj) {
        let obj2 = {};

        for (const [key, value] of Object.entries(obj)) {
            obj2[value] = key;
            
            console.log(obj2);
        }
            
        return obj2;
        
    }