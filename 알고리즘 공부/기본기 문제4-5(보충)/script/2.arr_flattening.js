/**
 * 
### **2️⃣ 배열 평탄화 (재귀 심화)**

> 🔹 _개념_: 재귀 함수 + 배열 처리  
> 🔹 _난이도_: ★★★★★

**문제**  
주어진 중첩 배열을 **재귀적으로 평탄화**하여 하나의 배열로 반환하세요.

    `const arr = [1, [2, [3, [4, 5]]]];`

    - 출력: `[1, 2, 3, 4, 5]`
        
 */

    const arr = [1, [2, [3, [4, 5]]]];
    console.log(arrFlattening(arr));

    /**
     * 일단 조건에 따라 처리해야되지만, 
     * 내가 아직 재귀함수를 사용하기에는 어려움이 있어서
     * 결과값을 내기 위해 다른 방법으로 가능한 것들을 조합해서 
     * 해당 결과값을 만들긴함
     * 결과적으로 해당 방법은 굉장히 비효율적인 방법임
     */
    // function arrFlattening (arr) {
    //     let arrlist = arr.reduce((a, b) => a + b);
    //     arrlist = arrlist.replace(/\,/g, '');
    //     let result = [];

    //     for (let i = 0; i < arrlist.length; i++) {
    //         result.push(Number(arrlist[i]));

    //     }

    //     return result;
    // }

    function arrFlattening (arr) {
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];

            // 요소가 배열이면 재귀 호출
            if (Array.isArray(current)) {
                result = result.concat(arrFlattening(current));
            } else {
                result.push(current);
            }
        }

        return result;
    }