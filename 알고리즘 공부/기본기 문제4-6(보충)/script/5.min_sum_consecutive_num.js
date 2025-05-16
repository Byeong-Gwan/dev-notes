/**
 * 
### **3-1. 연속된 숫자 구간 합 중 최소값**

> 🔹 _개념_: 슬라이딩 윈도우 + 합산  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    정수 배열에서 **연속된 숫자 구간의 합 중에서 최소값을 찾아 반환**하세요.  
    (구간의 길이는 3으로 고정)

    ```javascript
    const arr = [3, 4, 5, 1, 6, -2]; 
    console.log(minSum(arr)); // 4 (1 + 6 - 2)  

    function minSum(arr) {   // 여기에 슬라이딩 윈도우 로직 작성 
    ...
    }
    ```
 */

    const arr = [3, 4, 5, 1, 6, -2]; 
    console.log(minSum(arr)); // 4 (1 + 6 - 2)  

    function minSum(arr) {   // 여기에 슬라이딩 윈도우 로직 작성 
        const len = 3;
        let minSum = 0;
        for (let i = 0; i < len; i++) {
            minSum += arr[i];
        }

        let currentSum = minSum;

        for (let i = len; i < arr.length; i++) {
            currentSum = currentSum - arr[i - len] + arr[i];
            minSum = Math.min(minSum, currentSum);
        }

        return minSum;
    }