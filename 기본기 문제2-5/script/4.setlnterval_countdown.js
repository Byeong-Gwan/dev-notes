/**
 * 
### 4. **타이머 카운트다운**

> 입력된 초부터 0까지 1초 단위로 출력

- 입력: `5`
- 출력:
    
    복사편집
    
    `5 4 3 2 1 0 완료!`
    

### 조건

- `setInterval` 사용
- 음수 입력 시 예외 처리

 */

let inputPromp = 5;

let count;

const play = () => {
    inputPromp = inputPromp - 1;
    if (inputPromp === 0) {console.log('종료')}
    if (isNaN(inputPromp) || inputPromp <= 0) {return;}
    
    if (inputPromp === 0) {
        clearInterval(count);
    }
    console.log(inputPromp + '초');
}
console.log(inputPromp + '초');
setInterval(play, 1000);