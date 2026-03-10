// 문자열 곱하기
/**
 * 문제 설명:
    문자열 my_string과 정수 k가 주어질 때, 
    my_string을 k번 반복한 문자열을 return 하는 solution 함수를 작성해 주세요.
 * 
 * 제한사항
    1 ≤ my_string의 길이 ≤ 100
    my_string은 영소문자로만 이루어져 있습니다.
    1 ≤ k ≤ 100

 * my_string    k	result
    "string"	3	"stringstringstring"
    "love"	    10	"lovelovelovelovelovelovelovelovelovelove"
 */


    // function solution(my_string, k) {
    //     let result = '';

    //     for (let i = 1; i <= k; i++) {
    //         result += my_string;
    //     }

    //     return result;
    // }

    // console.log(solution("string", 3));
    // console.log(solution("love", 10));

    /**
     *  이보다 짧게 처리할 수 있음 repeat 함수를 사용한다면 더 짧게 처리 가능
     * repeat 함수의 반환 값은 현재 문자열 즉 my_string.repeat(k) 로 했을때
     * my_string의 입력받은 문자열 뒤에 k번 문자열을 추가해서 새로운 문자열을 만드는 함수
     * 
     * MDN 문서의 반환값으로 "현재 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열." 
     * 
     */

    function solution(my_string, k) {
        return my_string.repeat(k);
    }

    console.log(solution("string", 3));
    console.log(solution("love", 10));

    /**
     * 오늘 배운 내용
     * 
     * - 처음에는 for문을 사용해서 구현, 
     *   javascript의 내장 메서드인 String.prototypr.repeat()를 사용하면 훨씬 선언적이고 간결한 코드를 작성할 수 있음
     * 
     * - 앞으로 문제를 풀 때 단순히 '반복문'을 먼저 생각하기보다. 
     *   해당 데이터 타입에서 제공하는 '고유 메서드'가 있는지 찾아보는 습관 갖기.
     */