/**
 * 
## **📌 4️⃣ 2차원 배열에서 특정 값 찾기 (심화)**

**📝 문제:**  
주어진 2차원 배열에서 **특정 숫자가 포함된 위치(인덱스)를 반환하는 함수**를 작성하라.

    **✔ 조건:**

    - `for`문을 사용해서 2차원 배열을 탐색할 것
        
    - 특정 숫자가 존재하면 **배열의 위치 `[row, col]`을 반환**
        
    - 없으면 `-1` 반환
        

    **🔹 입력 예시:**

    `let matrix = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]; console.log(findNumber(matrix, 5));`

    **🔹 출력 예시:**

    `[1, 1]  // (두 번째 행, 두 번째 열)`

 */

    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9] 
    ]; 
    console.log(findNumber(matrix, 5));
    console.log(findNumber(matrix, 9));
    console.log(findNumber(matrix, 11));

    function findNumber (arr, idx) {
        for (let i = 0; i < arr.length; i++){
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === idx) {
                    return [i, j];
                } 
            }
        }
        return -1;
    }