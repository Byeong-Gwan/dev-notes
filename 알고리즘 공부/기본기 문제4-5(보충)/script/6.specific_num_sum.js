/**
 * 
### **6️⃣ 특정 합을 가지는 두 숫자 쌍 찾기**

> 🔹 _개념_: 투 포인터 + 조건 비교  
> 🔹 _난이도_: ★★★☆☆

**문제**  
주어진 배열에서 두 숫자의 합이 `10`이 되는 쌍을 모두 찾으세요.

    `const arr = [1, 9, 2, 8, 3, 7, 4, 6];`

    - 출력: `[[1, 9], [2, 8], [3, 7], [4, 6]]`
        
 */
/**
 * 1. 배열의 첫번째 값으로 전체 비교하면서 합이 10되는 쌍을 찾는다.
 * 2. 합이 10인 쌍을 a배열에 넣는다.
 * 3. a배열 -> b배열에 누적시킨다.
 * 4. b배열을 반환
 */
    const arr = [1, 9, 2, 8, 3, 7, 4, 6];
    console.log(specificNumSum(arr));

    // 잘못된 로직 
    // function specificNumSum (arr) {
    //     let a = []; // 합이 10인 쌍을 담는다.
    //     let b = []; // 누적시킬 배열
    //     let initial = 0;

    //     for (let i = 1; i < arr.length; i++) {
    //         if (arr[i] + arr[initial] === 10) {
    //             a.push(arr[i]);
    //             a.push(arr[initial]);
    //             b.push(a);
    //             initial++;
    //         }
    //     }
    //     return b;
    // }

    function specificNumSum (arr) {
        let result = [];
        arr.sort((a, b) => a - b); // 배열을 오름차순으로 정렬

        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            const sum = arr[left] + arr[right]; // 10?

            if (sum === 10) {
                result.push([arr[left], arr[right]]);
                left++; // 배열 처음부터 시작해서 증가
                right--; // 배열의 맨 마지막부터 감소
            } else if (sum < 10) {
                left++; // 합이 작으면 left 포인터를 오른쪽으로 이동
            } else {
                right--; // 합이 크면 right 포인터를 왼쪽으로 이동
            }
        }
        return result;
    }