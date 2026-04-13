/** 원소들의 곱과 합
 * 문제 설명
    정수가 담긴 리스트 num_list가 주어질 때, 
    모든 원소들의 곱이 모든 원소들의 합의 제곱보다 작으면 1을 
    크면 0을 return하도록 solution 함수를 완성해주세요.

 * 제한사항
    2 ≤ num_list의 길이 ≤ 10
    1 ≤ num_list의 원소 ≤ 9

 * 입출력 예
    num_list	        result
    [3, 4, 5, 2, 1]	    1
    [5, 7, 8, 3]	    0
 */

function solution(num_list) {
    // 1. 넘어온 배열의 모든 요소의 곱 => A
    // 2. 넘어온 배열의 모든 요소의 합의 **2 =>  B
    // 3. 두 값을 비교 A가 크면 0, B가 크면 1 return
    let a = 1;
    let b = 0;
    num_list.map(value => a *= value);
    num_list.map(value => b += value);
    
    if (a > (b**2)) {
        return 0;
    } else {
        return 1;    
    }
    
}

console.log(solution([3, 4, 5, 2, 1]));
console.log(solution([5, 7, 8, 3]));

// reduce 사용
// const a = num_list.reduce((acc, val) => acc * val, 1);
// const b = num_list.reduce((acc, val) => acc + val, 0);
// return a < b**2 ? 1 : 0;