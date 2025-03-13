/**
 * 
**문제:**  
HTML 문서에서 버튼을 클릭했을 때,  
**"버튼이 클릭되었습니다!"** 라는 문구가 화면에 나타나도록 만들어보세요.

_(힌트: `document.getElementById()` 또는 `document.querySelector()`를 사용하면 좋아요!)_
 */

const button = document.getElementById('submit');
button.addEventListener('click', () => {
    alert('버튼이 클릭되었습니다!');
});
