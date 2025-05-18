/**
 * 
### **4-2. 중복된 숫자만 추출하여 정렬하기**

> 🔹 _개념_: 중복 체크 + 정렬  
> 🔹 _난이도_: ★★★★☆

    **문제:**  
    주어진 배열에서 **중복된 숫자들만 추출하여 오름차순 정렬된 배열**을 반환하세요.

    ```javascript
    const arr = [4, 1, 2, 2, 3, 4, 5, 5]; 
    console.log(findDuplicates(arr)); // [2, 4, 5]  

    function findDuplicates(arr) {   // 여기에 중복 체크 및 정렬 로직 작성 
    ...
    }
    ```

 */

    const arr = [4, 1, 2, 2, 3, 4, 5, 5]; 
    console.log(findDuplicates(arr)); // [2, 4, 5]  

    function findDuplicates(arr) {   // 여기에 중복 체크 및 정렬 로직 작성 
        arr.sort((a, b) => a - b);

        // 중복 제거
        const result = arr.filter((element, idx) => {
            return arr.indexOf(element) !== idx
        });

        return result;
    }