/**
 * 
## **📌 2️⃣ 객체 배열에서 특정 속성 값만 추출하기 (중급)**

**📝 문제:**  
객체 배열에서 특정 속성(`name`) 값만 뽑아서 **새 배열로 반환하는 함수**를 만들어라.

    **✔ 조건:**

    - `for`문을 사용해서 직접 배열을 순회할 것
        
    - `map()` 사용 금지
        

    **🔹 입력 예시:**

    `let users = [   { name: "철수", age: 18 },   { name: "영희", age: 22 },   { name: "민수", age: 25 } ];  console.log(getNames(users));`

    **🔹 출력 예시:**

    `["철수", "영희", "민수"]`

 */

    let users = [ 
        { name: "철수", age: 18 }, 
        { name: "영희", age: 22 }, 
        { name: "민수", age: 25 } 
    ];
    
    console.log(getNames(users));

    function getNames (arr) {
        let arr2 = arr.map((e) => {
           e.name;
        });
        return arr2;
    }