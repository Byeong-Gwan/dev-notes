/**
 * 
**문제:**  
HTML의 `<input>` 태그에 사용자가 입력한 값을  
**실시간으로 화면에 출력**하도록 만들어보세요.
 */

// input 태그에 입력된 데이터를 버튼 클릭시 출력
const input = document.getElementById('input');
const button = document.getElementById('submit');
const inputList = document.getElementById('list');

// input 에 입력된 데이터의 값을 출력 event
button.addEventListener('click', () => {
    const inputValue = input.value;
    inputList.innerHTML += `<li>${inputValue}</li>`;
});

