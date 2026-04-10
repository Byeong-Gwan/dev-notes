/** 등차수열의 특정한 항만 더하기
 * 문제 설명
    두 정수 a, d와 길이가 n인 boolean 배열 included가 주어집니다. 
    첫째항이 a, 공차가 d인 등차수열에서 included[i]가 i + 1항을 의미할 때, 
    이 등차수열의 1항부터 n항까지 included가 true인 항들만 더한 값을 return 하는 solution 함수를 작성해 주세요.

 * 제한사항
    1 ≤ a ≤ 100
    1 ≤ d ≤ 100
    1 ≤ included의 길이 ≤ 100
    included에는 true가 적어도 하나 존재합니다.

 * 입출력 예
    a	d	included	                                        result
    3	4	[true, false, false, true, true]	                37
    7	1	[false, false, false, true, false, false, false]	10

 */

// 처음 푼 문제 (비효율적임))
// function solution(a, d, included) {
//     // 1. a=3, b=4, true= '+' false = '-'
//     // 중요 false 여도 더한 값이 들어가야됨
//     let arr = [];
//     let result =0;
    
//     // arr배열 셋팅
//     included.forEach((value, idx) => {
//         if (idx === 0) {
//             arr.push(a);
//         } else {
//             arr.push(arr[idx-1] + d);
//         }
//     });
    
//     // 이제 true인 값만 추출 후 합을 구함
//     arr.forEach((value, idx) => {
//         if (included[idx]) {
//             result += value;
//         }
//     });
    
//     return result;
// }

console.log(solution(3, 4, [true, false, false, true, true]));
console.log(solution(7, 1, [false, false, false, true, false, false, false]));

// 조금더 효욜적인 풀이
function solution(a, d, included) {
    let result = 0;

    included.forEach((value, idx) => {
        if (value) {
            result += a + d * idx;
        }
    });
    return result;
}