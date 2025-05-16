/**
 * 
### **3-2. 특정 합을 가지는 세 숫자 쌍 찾기**

> 🔹 _개념_: 투 포인터 + 조건 비교  
> 🔹 _난이도_: ★★★★☆

    **문제:**  
    주어진 배열에서 **세 숫자의 합이 `10`이 되는 쌍을 모두 찾으세요.**

    ```javascript
    const arr = [1, 2, 3, 4, 5, 6]; 
    console.log(findTriplets(arr, 10)); // [[1, 2, 7], [1, 3, 6], [2, 3, 5]]

    function findTriplets(arr, target) {   // 여기에 투 포인터 로직 작성 
    ...
    }

 */

    const arr = [1, 2, 3, 4, 5, 6]; 
    console.log(findTriplets(arr, 10)); // [[1, 2, 7], [1, 3, 6], [2, 3, 5]]

    function findTriplets(arr, target) {   // 여기에 투 포인터 로직 작성 
        let result = [];
        arr.sort((a, b) => a - b);

        for (let i = 0; i < arr.length; i++) {
            let left = i + 1;
            let right = arr.length - 1

            while (left < right) {
                const sum = arr[i] + arr[left] + arr[right];
    
                if (sum === target) {
                    result.push([arr[i], arr[left], arr[right]]);
                    left++;
                    right--;
                }else if (sum < target) {
                    left++; // 합이 작으면 left 포인터를 오른쪽으로 이동
                } else {
                    right--; // 합이 크면 right 포인터를 왼쪽으로 이동
                }
            }
        }
        
        return result;
    }