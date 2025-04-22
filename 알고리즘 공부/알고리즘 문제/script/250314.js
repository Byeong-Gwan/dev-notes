/**
 * ### **문제: 배열에서 가장 큰 차이값 찾기**

**문제 설명:** 주어진 숫자 배열에서 **두 숫자 간의 차이 중 가장 큰 값**을 구하는 함수를 작성하세요. 단, 차이를 구할 때 두 숫자는 배열에서 **순서대로 나열되어야 하며**, 앞의 숫자가 뒤의 숫자보다 작아야만 차이를 구할 수 있습니다.

### **입력 예시:**

js

복사편집

`const arr = [5, 3, 6, 8, 1, 9, 4];`

### **출력 예시:**

js

복사편집

`7`

**설명:**  
배열에서 두 숫자 간의 차이가 가장 큰 값은 **1과 8** 사이의 차이인 **7**입니다.
 */

function findMaxDifference(arr) {
    // 최소값 초기화
    let min = arr[0];
    let maxDiff = 0;  // 최대 차이값을 저장할 변수

    // 배열을 순차적으로 돌면서 차이 계산
    for (let i = 1; i < arr.length; i++) {
        let diff = arr[i] - min;  // 현재 값과 최소값의 차이 계산
        if (diff > maxDiff) {
            maxDiff = diff;  // 최대 차이값 갱신
        }
        
        if (arr[i] < min) {
            min = arr[i];  // 새로운 최소값 갱신
        }
    }

    return maxDiff;
}

// 테스트
const arr = [5, 3, 6, 8, 1, 9, 4];
console.log(findMaxDifference(arr));  // 8

document.write('결과 값: ', findMaxDifference(arr))
