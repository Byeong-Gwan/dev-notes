/**
 * 
## **📌 5️⃣ 숫자 배열 정렬하기 (심화)**

**📝 문제:**  
주어진 숫자 배열을 **오름차순으로 정렬하는 함수**를 작성하라.  
(예: `[4, 2, 7, 1]` → `[1, 2, 4, 7]`)

    **✔ 조건:**

    - `for`문을 사용해서 직접 정렬 알고리즘을 구현할 것
        
    - `sort()` 사용 금지
        
    - **버블 정렬(Bubble Sort) 방식으로 구현**
        

    **🔹 입력 예시:**

    `console.log(sortNumbers([4, 2, 7, 1]));`

    **🔹 출력 예시:**

    `[1, 2, 4, 7]`

 */

    console.log(sortNumbers([4, 2, 7, 1]));
    console.log(sortNumbers([9, 5, 3, 8, 6])); // [3, 5, 6, 8, 9]
    console.log(sortNumbers([1, 2, 3, 4])); // [1, 2, 3, 4] (이미 정렬된 경우)

    // 선택 정렬(Selection Sort): 가장 작은 값을 찾아서 현재 위치와 바꿈
    // function sortNumbers (arr) {
        
    //     for (let i = 0; i < arr.length - 1; i++) {
    //         for (let j = i + 1; j < arr.length; j++) {
    //             if (arr[i] > arr[j]) {
    //                 [arr[i], arr[j]] = [arr[j], arr[i]];
    //             }
    //         }
            
    //     }
    //     return arr;
    // }

    function sortNumbers (arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }