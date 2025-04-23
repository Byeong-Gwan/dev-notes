
// function testScope () {
//     let a = 10;
//     if (true) {
//         let b = 20;
//         console.log(a); // ✅ 가능
//     }
//     console.log(b); // ❌ ReferenceError: b is not defined 
// }

console.log(testScope());

function testScope () {
    let a = 10;
    let b = 20;

    if (true) {
        let c = 30;
        console.log(a); // 10
        console.log(b); // 20
        console.log(c); // 30
    }
    console.log(a); // 10
    console.log(b); // 20
    console.log(c); // ❌ ReferenceError: b is not defined 
} 

// 코드블록 차이 (전역변수와 지역변수)
/* 
보충 설명:  
    ❗ 블록 스코프와 함수 스코프의 차이: 변수는 선언된 블록(중괄호 {}) 내부에서만 유효하다
    let, const는 블록 스코프를 가지며, 선언된 코드 블록 외부에서는 접근할 수 없다.
 */
