/** 약수의 개수와 덧셈
 * 문제 설명
    두 정수 left와 right가 매개변수로 주어집니다. 
    left부터 right까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 
    약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.

 * 제한사항
    1 ≤ left ≤ right ≤ 1,000

 * 입출력 예
    left	right	result
    13	    17	    43
    24	    27	    52
 */

// left 값 부터 right 값까지 각 수의 약수 개수 확인
// 확인한 개수가 짝수인 값은 + 홀수인 값은 - 해서 총 값을 구한다.
function solution(left, right) {
    let answer = 0;
    
    // i 값에 left(시작값)을 할당하고, right보다  작거나 같은동안 반복
    for (let i = left; i <= right; i++) {
        let count = 0;
        // 초기값 j에 1 할당 j 값이 i보다 작거나 같은동안 반복
        for (let j = 1; j <= i; j++) {
            // j로 i로 나눴을때 0이 나오면 짝수 count ++ 증감
            if (i % j === 0) {
                count++;
            }   

        }
        
        // 개수를 확인한 count 값으로 2를 나누었을때 0이면 짝수 +
        if (count % 2 === 0) {
            answer += i;
        } else {
            answer -= i // 홀수 -
        }
    }
    
    return answer;
}