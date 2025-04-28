/**
 * ### 1️⃣ 공통 문자 순서대로 정렬하기 (기초~중급)

**문제**  
두 문자열이 주어졌을 때,  
공통으로 존재하는 문자를 **알파벳 순서**로 정렬해서 반환하세요.

    - 입력: `"banana"`, `"bandana"`
        
    - 출력: `"aaabnn"`
        

    📌 조건:

    - `for`, `includes`, `sort`, `join` 사용 가능
        
    - 중복 문자 유지해야 함
        
 */

    console.log(strSortOrder("banana", "bandana"));

    function strSortOrder (str1, str2) {
        const arr1 = str1.split('');
        const arr2 = str2.split('');
        let result = [];

        arr1.forEach((e, idx) => {
            if (arr2.includes(e)) {
                result.push(e);
            }
        });
        return result.sort().join('');
    }