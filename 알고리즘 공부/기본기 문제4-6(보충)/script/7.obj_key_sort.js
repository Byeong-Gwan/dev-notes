/**
 * 
### **4-1. 객체를 키 기준으로 정렬하기**

> 🔹 _개념_: 객체 정렬 + 키/값 추출  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    객체의 **키를 알파벳 순서로 정렬된 배열**로 반환하세요.

    ```javascript
    const data = { c: 2, a: 5, b: 1 }; 
    console.log(sortKeys(data)); // ['a', 'b', 'c']  

    function sortKeys(data) {   // 여기에 정렬 로직 작성 
    ...
    }

 */

    const data = { c: 2, a: 5, b: 1 }; 
    console.log(sortKeys(data)); // ['a', 'b', 'c']  

    function sortKeys(data) {   // 여기에 정렬 로직 작성 
        let arr = Object.keys(data);

        // localeCompare() 메서드는 대소문자 구분, 특수 문자 순서 등을 고려한 정렬
        return arr.sort((a, b) => a.localeCompare(b));
    }