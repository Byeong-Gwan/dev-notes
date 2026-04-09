/** 홀짝에 따라 다른 값 반환하기
 * 문제 설명
    양의 정수 n이 매개변수로 주어질 때, 
    n이 홀수라면 n 이하의 홀수인 모든 양의 정수의 합을 return 하고 
    n이 짝수라면 n 이하의 짝수인 모든 양의 정수의 제곱의 합을 return 하는 
    solution 함수를 작성해 주세요.
 
 * 제한사항
    1 ≤ n ≤ 100

 * 입출력 예
    n	result
    7	16
    10	220
 */


// n이 홀수 일때, n 이하 값들 모두의 합을 구하라
// n이 짝수 일때, n 이하 값들 모두의 제곱값 모두 합을 구하라
// n의 값을 나누어 나머지 여부 확인 나머지 있으면 홀수 없으면 짝수
// 홀수면 0보다 크고 n값보다 작은 홀수 값 구하기 
function solution(n) {
    let result = 0;
    let arr = [];

    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }

    if (n % 2 === 0) {
        arr.forEach((a) => {if (a % 2 === 0) result += (a*a)});
    } else {
        arr.forEach((a) => {if (a % 2 !== 0) result += a});
    }

    return result;
}

console.log(solution(7));
console.log(solution(10));