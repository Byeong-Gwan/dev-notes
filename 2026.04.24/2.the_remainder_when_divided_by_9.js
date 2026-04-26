/** 9로 나눈 나머지
 * 문제 설명
    음이 아닌 정수를 9로 나눈 나머지는 그 정수의 각 자리 숫자의 합을 9로 나눈 나머지와 같은 것이 알려져 있습니다.
    이 사실을 이용하여 음이 아닌 정수가 문자열 number로 주어질 때, 
    이 정수를 9로 나눈 나머지를 return 하는 solution 함수를 작성해주세요.

 * 제한사항
    1 ≤ number의 길이 ≤ 100,000
    number의 원소는 숫자로만 이루어져 있습니다.
    number는 정수 0이 아니라면 숫자 '0'으로 시작하지 않습니다.

 * 입출력 예
    number	                result
    "123"	                6
    "78720646226947352489"	2
 */

// 각 자리 숫자 합 "123" => 1 + 2 + 3 = 6
// 6 % 9 = 6 나머지 값 반환
// 1. 문자열로 넘어오는 숫자 number로 형변환
// 2. 형변환한 숫자 각 합계 계산
// 3. 9로 나눈 나머지 값 반환
function solution(number) {
    let answer = 0;
    const arr = number.split('');
    arr.forEach(a => answer = (answer + Number(a)) % 9);
    return answer;
}

console.log(solution("123"));
console.log(solution("78720646226947352489"));