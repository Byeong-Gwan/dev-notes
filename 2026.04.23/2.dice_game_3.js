/** 주사위 게임 3
 * 문제 설명
    1부터 6까지 숫자가 적힌 주사위가 네 개 있습니다. 
    네 주사위를 굴렸을 때 나온 숫자에 따라 다음과 같은 점수를 얻습니다.

    - 네 주사위에서 나온 숫자가 모두 p로 같다면 1111 × p점을 얻습니다.
    - 세 주사위에서 나온 숫자가 p로 같고 나머지 다른 주사위에서 나온 숫자가 q(p ≠ q)라면 (10 × p + q)2 점을 얻습니다.
    - 주사위가 두 개씩 같은 값이 나오고, 나온 숫자를 각각 p, q(p ≠ q)라고 한다면 (p + q) × |p - q|점을 얻습니다.
    - 어느 두 주사위에서 나온 숫자가 p로 같고 나머지 두 주사위에서 나온 숫자가 각각 p와 다른 q, r(q ≠ r)이라면 q × r점을 얻습니다.
    - 네 주사위에 적힌 숫자가 모두 다르다면 나온 숫자 중 가장 작은 숫자 만큼의 점수를 얻습니다.
    
    네 주사위를 굴렸을 때 나온 숫자가 정수 매개변수 a, b, c, d로 주어질 때, 
    얻는 점수를 return 하는 solution 함수를 작성해 주세요.

 * 제한사항
    a, b, c, d는 1 이상 6 이하의 정수입니다.

 * 입출력 예
    a	b	c	d	result
    2	2	2	2	2222
    4	1	4	4	1681
    6	3	3	6	27
    2	5	2	6	30
    6	4	2	5	2

 */

// * 1 ~ 6까지 숫자 (주사위- 4개)
// 1. 모두 p와 같은 숫자이면 1111 * p점
// 2. 3개 숫자 p와 같고, 하나의 숫자는 q 라면 (10 * p + q)2(제곱)점
// 3. 나온 4개의 숫자가 각 2개 === p , 2개 === q 이면 (p + q) * |p - q|점
// * | | 절댓값 마이너스가 나와도 양수로 반환
// 4. 모든 숫자가 다르면 가장 작은 값을 반환한다.
function solution(a, b, c, d) {
    let answer = 0;
    let result = `${a}, ${b}, ${c}, ${d}`.split(',').map(Number);
    const uniq = new Set(result).size;
    
    const counts = {};
    for (let num of result) {
        counts[num] = (counts[num] || 0) + 1;
    }
    
    const p = Number(Object.keys(counts).find(k => counts[k] === 3));
    const q = Number(Object.keys(counts).find(k => counts[k] === 1));
    
    if (uniq === 1) {
        answer = 1111 * a;
    } else if (uniq === 2) {
        if (Object.values(counts).includes(3)) {
            answer = (10 * p + q) ** 2;    
        } else {
            const [p, q] = Object.keys(counts).filter(k => counts[k] === 2).map(Number);
            answer = (p + q) * Math.abs(p - q);
        }
        
    } else if (uniq === 3) {
        const qr = Object.keys(counts).filter(k => counts[k] === 1).map(Number);
        answer = qr[0] * qr[1];
    } else if (uniq === 4) {
        answer = Math.min(...result);
    }
    return answer;
}

console.log(solution(2, 2, 2, 2));
console.log(solution(4, 1, 4, 4));
console.log(solution(6, 3, 3, 6));
console.log(solution(2, 5, 2, 6));
console.log(solution(6, 4, 2, 5));