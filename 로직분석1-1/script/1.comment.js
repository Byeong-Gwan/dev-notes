
/**
 * 🧠 분석 포인트
IIFE 패턴: 왜 ()로 감쌌을까?
        이유	        설명
    1. 즉시 실행	     함수를 선언하자마자 실행하기 위해
    2. 전역 오염 방지	  변수/함수가 외부에 노출되지 않도록
    3. 구조 정리	     설정, 초기화 코드 등을 깔끔하게 묶기 위해

    1. addComment() 함수의 역할은?
        addBtn button을 클릭하게되면 text를 인자 값으로 받아서 입력된 문자를 list에 추가된다. 

    2. delBtn.addEventListener('click'...)의 로직은 어떤 흐름?
        click 이벤트가 발생했을때 해당 내부의 함수가 실행하게 된다.

    3. appendChild()는 어떤 구조로 DOM에 붙는가?

        <li>
            <span></span>
            <button></button>
        </li>
        이런 구조로 생성된다.

✍ 연습 미션
    ✅ 해당 로직을 손으로 직접 써보기

    ✅ 각 함수별 기능을 주석으로 정리해보기

    ✅ "수정" 버튼도 만들어 추가해보기
 */

    (function () {
        // comment-input id값을 갖고 있는 요소를 가져온다.
        const commentInput = document.getElementById('comment-input');
        // add-comment id 값을 갖고 있는 button 요소를 가져온다.
        const addBtn = document.getElementById('add-comment');
        // comment-list id값을 갖고 ul 요소를 갖고온다.
        const commentList = document.getElementById('comment-list');

        function addComment (text) {
            // li 태그를 만든다.
            const li = document.createElement('li');
            // span 태그를 만든다.
            const span = document.createElement('span');
            // button 태그를 만든다.
            const delBtn = document.createElement('button');
            // 수정 버튼 생성
            const chgBtn = document.createElement('button');

            // span tag에 인자값으로 받은 Text를 대입한다.
            span.textContent = text;
            // button 생성하고 button명을 삭제 문자를 넣어 준다.
            delBtn.textContent = '삭제';
            // 수정 버튼 생성 해서 수정 문구 추가
            chgBtn.textContent = '수정'

            // click event가 발생하게 되면 함수가 실행됨 
            delBtn.addEventListener('click', function () {
                // ul 태그에 자식으로 생성된 li 태그 제거
                commentList.removeChild(li);
            });

            // 수정 이벤트
            chgBtn.addEventListener('click', function () {
                // 수정할 text 가져와서 변경
                let result = prompt('수정::', span.textContent);
                if (result !== '') {
                    span.textContent = result
                }
            });

            // li tag 자식으로 span 태그 추가
            li.appendChild(span);
            // li tag 자식으로 button 태그 추가
            li.appendChild(delBtn);

            li.appendChild(chgBtn);

            // ul tag에 li 태그를 자식 요소로 추가한다.
            // 이렇게 처리하게되면, il tag의 자식으로 있는 span, button 같이 추가된다.
            commentList.appendChild(li);
        }

        // 버튼 클릭 이벤트
        addBtn.addEventListener('click', function () {
            // text 변수에 input 에 있는 값을 공백을 제거하고 담는다.
            const text = commentInput.value.trim();

            // text가 빈 값이 아니면
            if (text !== '') {
                // addComment 함수에 Input에 입력된 값을 가지고 넘어간다.
                addComment(text);
                // input을 빈값으로 초기화
                commentInput.value = '';
            }
        });
    })();