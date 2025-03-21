/**
 * ### **1. 중복 문자 제거기 (Set 사용 금지)**

    > 문자열을 입력받아, **중복된 문자를 제거한 결과**를 출력하세요.

    - 입력: `"banana"`
    - 출력: `"ban"`

    ### 조건

    - `split`, `indexOf` 등을 직접 활용 (Set 사용 X)
    - 중복 제거된 문자열을 반환
 */
    const inputData = prompt('단어를 입력해주세요.');
    let arr = [];
    arr = Array.from(inputData);
    
    let idx = arr.filter((element, index) => {
        return arr.indexOf(element) === index;
    });
    
    document.writeln(idx);
    console.log('idx??', idx);
    
    