/**
 * 
 8. **배열 요소 빈도수 구하기**
    문자열 배열에서 각 요소가 몇 번 등장했는지 세어라. 
    입력: ["apple", "banana", "apple", "kiwi", "banana", "apple"] 
    출력: { apple: 3, banana: 2, kiwi: 1 }

 */

    const arr = ["apple", "banana", "apple", "kiwi", "banana", "apple"];
    console.log(arrFindFrequency(arr));

    function arrFindFrequency (arr) {
        // let obj = {};

        // for (const key of arr) {
        //     console.log('ee')
        //     obj[key] = (obj[key] || 0 ) + 1;
        // }

        return arr.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
    }