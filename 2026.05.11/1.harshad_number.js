/** 하샤드 수
 * 문제 설명
    양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 
    예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 
    자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

 * 제한 조건
    x는 1 이상, 10000 이하인 정수입니다.

 * 입출력 예
    x	return
    10	true
    12	true
    11	false
    13	false
 */

// 하샤드 수로 true/ false 로 반환 
// 예1) 12, 1 + 2 = 3, 12/3 = 4 정수로 떨어짐 (true)
// 예2) 13, 1 + 3 = 4, 13/4 = 3.25 정수가 아님 (false)
// 계산 시 나머지값이 0이면 true, 아니면 false 로 반환
function solution(x) {
    const arr = x
                .toString()
                .split('')
                .reduce((acc, cur) => Number(acc) + Number(cur));
    
    return x % arr === 0;
}