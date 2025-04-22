/**
 * 
# **3. 두 배열의 교집합 구하기**

 * 💡 두 개의 숫자 배열이 주어졌을 때, **공통으로 존재하는 숫자들만 모아서 새로운 배열을 반환**하는 함수를 작성하세요.

    js

    복사편집

    `var arr1 = [1, 2, 3, 4, 5, 6]; var arr2 = [4, 5, 6, 7, 8, 9];`

    📌 `indexOf()` 또는 `includes()` 없이 문제를 풀어보세요.

 */

    const arr1 = [1, 2, 3, 4, 5, 6]; 
    const arr2 = [4, 5, 6, 7, 8, 9];

    // includes() 사용 시 비교
    let result = arr1.filter(element => arr2.includes(element));

    document.write('캍은 숫자: ', result);
    document.write('<br>');

    // for문으로 처리
    for (let i = 0; i < arr1.length; i++) {
        let a = arr1[i];

        for (let j = 0; j < arr2.length; j++) {
            if (a === arr2[j]) {
                document.write(a, ', ');
            }
        }
    } 