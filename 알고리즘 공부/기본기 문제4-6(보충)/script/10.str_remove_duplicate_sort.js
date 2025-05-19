/**
 * 
### **5-2. 문자열 내 중복 문자 제거 및 정렬 (최적화)**

> 🔹 _개념_: 중복 제거 + 정렬  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    문자열에서 **중복된 문자를 제거하고, 정렬된 결과**를 반환하세요.

    ```javascript
    const str = "dcbaabcd"; 
    console.log(removeAndSort(str)); // "abcd"  

    function removeAndSort(str) {   // 여기에 최적화된 로직 작성 
    ...
    }
    ```

 */

    const str = "dcbaabcd"; 
    console.log(removeAndSort(str)); // "abcd"  

    function removeAndSort(str) {   // 여기에 최적화된 로직 작성 
        let result =[];

        for (let i = 0; i < str.length; i++) {
            if (result.indexOf(str[i]) === -1) {
                result.push(str[i]);
            }
        }

        return result.sort().join('');
    }

        // Set을 이용하여 중복 제거하고, 배열로 변환 후 정렬
        // return [...new Set(str)].sort().join('');