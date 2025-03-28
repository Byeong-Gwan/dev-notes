/**
 * 
### 5. **간단한 투표 시스템**

    > 후보를 입력 받아 투표, 최종 결과 출력

    - 입력 후보: `['Alice', 'Bob', 'Charlie']`
    - 투표 입력: `prompt` 5회 (후보 이름 입력)
    - 출력:
        
        makefile
        
        복사편집
        
        `Alice: 2표 Bob: 1표 Charlie: 2표`
        

    ### 조건

    - `객체`로 투표 수 집계
    - 존재하지 않는 이름 입력 시 "없는 후보" 알림 후 무효 처리
 */

    const arr = ['Alice', 'Bob', 'Charlie'];
    
    let arr2 = [];
    let obj = {};
    let voteNum = 5;
    let count;

    for (let i = 0; i < voteNum; i++) {
        let inputPromp = prompt('투표 해주세요. Alice, Bob, Charlie', '');
        arr2[i] = inputPromp;
        let index = arr2[i];
        if (obj[index]) {
            obj[index]++;
        } else {
            obj[index] = 1;
        }
        arr.forEach((e) => {
            for (let i = 0; i < arr2.length; i++) {
                console.log(arr2[i]);
                if (e === arr2[i]) {
                    return arr2[i]
                } else {4
                    return '무효';
                }
            }
        });
    }

    console.log('fefe',arr2);
    console.log('obj',Object.keys(obj).join(': ') + Object.values(obj).join('표'));