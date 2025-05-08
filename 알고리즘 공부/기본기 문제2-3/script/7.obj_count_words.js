/**
 * 
#### **7. 단어 개수 세기**
    💡 문장을 입력받아, **각 단어가 몇 번 나왔는지 개수를 세서 객체로 반환**하는 코드를 작성하세요.

    `입력: "hello world hello" 출력: { hello: 2, world: 1 }`

    📌 `split()`과 객체를 활용하면 해결할 수 있습니다.

 */

    const str = "hello world hello";
    const strArr = str.split(" ");
    let obj = {};

    strArr.forEach((element) => {
        obj[element] = (obj[element] || 0) + 1;
    });

    document.writeln(JSON.stringify(obj));