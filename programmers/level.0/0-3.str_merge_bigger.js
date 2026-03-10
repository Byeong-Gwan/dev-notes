// 더 크게 합치기
/**
 * 문제 설명
    연산 ⊕는 두 정수에 대한 연산으로 두 정수를 붙여서 쓴 값을 반환합니다. 예를 들면 다음과 같습니다.

    12 ⊕ 3 = 123
    3 ⊕ 12 = 312
    양의 정수 a와 b가 주어졌을 때, a ⊕ b와 b ⊕ a 중 더 큰 값을 return 하는 solution 함수를 완성해 주세요.

    단, a ⊕ b와 b ⊕ a가 같다면 a ⊕ b를 return 합니다.

 * 제한사항
    1 ≤ a, b < 10,000

 * 입출력 예
    a	b	result
    9	91	991
    89	8	898
 */

    function solution(a, b) {
        let answer = 0;
        const t1 = Number(String(a) + b);
        const t2 = Number(String(b) + a);
        
        if (t1 > t2) {
            answer = t1;
        } else if(t2 > t1) {
            answer = t2;
        } else {
            answer = t1;
        }
        
        return answer;
    }

    console.log(solution(9, 91));
    console.log(solution(89, 8));


// 위 내용처럼 하게 되면 로직이 길어지는 문제 발생 줄일 필요성있음

/**
 * 오늘 배운 내용
 * 
 * - 백틱 활용하자 해당 로직을 백틴(`)사용하면 로직이 상당히 줄어든다. 
 */

    function solutionBacktick(a, b) {
        return Math.max(Number(`${a}${b}`), Number(`${b}${a}`));
    }
    
    console.log(solutionBacktick(9, 91));
    console.log(solutionBacktick(89, 8));