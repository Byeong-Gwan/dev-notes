/**
 * 
 9. **문자열 뒤집기**
    문자열을 뒤집어서 반환하라. 
    입력: "javascript" 
    출력: "tpircsavaj"

 */

    const str = "javascript";
    console.log(stringReverse(str));

    function stringReverse (str) {
        // // 1. 문자열을 잘라서 배열로 전환
        // const arr = str.split('');
        // console.log('1번: ', arr);

        // // 2. 배열을 뒤집기
        // const reversedArr = arr.reverse();
        // console.log('2번: ', reversedArr);

        // // 3. 다시 문자열로 전환
        // const reversedStr = reversedArr.join('');
        // console.log('3번: ', reversedStr);

        // return reversedStr;

        return str.split('').reduce((acc, cur) => cur + acc, '');
    }