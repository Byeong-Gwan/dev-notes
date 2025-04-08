/**
 * 🎯 분석 미션
    li, span, button은 어떤 관계로 붙는지 그려보기

    list.removeChild(li)가 실제로 어떤 일을 하는지 글로 설명

    수정 버튼을 추가해보기

    localStorage에 저장 후 새로고침 시 유지되게 하기

    주석을 달아서 기능을 설명해보기


 */

    (function () {
        // html에 있는 input, add-btn, list 태그의 id 값을 가져온다.
        const input = document.getElementById('input');
        const btn = document.getElementById('add-btn');
        const list = document.getElementById('list');

        // 함수 선언 text 라는 인자 값을 받는다.
        function addItem(text) {
            // li, span, button 태그를 만든다.
            const li = document.createElement('li');
            const span = document.createElement('span');
            const removeBtn = document.createElement('button');

            // 수정 버튼 추가 (신규)
            const changeBtn = document.createElement('button');

        
            // span 에 문자로 인자로 받아온 text 값을 넣어준다. 
            span.textContent = text;
            // '삭제' 문자를 버튼 내용에 추가한다.
            removeBtn.textContent = '삭제';

            // '수정' 문자를 버튼 내용에 추가 (신규)
            changeBtn.textContent = '수정';
        
            // 이벤트 click 시 list id 값을 가진 요소의 자식 요소인 Li 태그를 제거한다.
            removeBtn.addEventListener('click', function () {
                list.removeChild(li);

                const saveList = JSON.parse(localStorage.getItem('todolist')) || [];
                const updatedList = saveList.filter((item) => {return item !== span.textContent;});
                localStorage.setItem('todolist', JSON.stringify(updatedList));
            });

            // 이벤트 click 시 수정 (신규)
            changeBtn.addEventListener('click', function () {
                const updatedText = prompt('수정하세요.', span.textContent);
                if (updatedText !== null && updatedText !== '') {
                span.textContent = updatedText;
                storageSave(updatedText);
                }
            });

        
            // li 태그의 자식요소로 span, removeBtn 넣어준다.
            li.appendChild(span);
            li.appendChild(removeBtn);

            // 수정 버튼 Li 태그 자식 요소로 추가
            li.appendChild(changeBtn);

            // li 태그를 list id 값을 가진 태그 자식으로 추가
            list.appendChild(li);
        }
        
        // localStorage 저장 하기 (신규)
        function storageSave (text) {
            const saveList = JSON.parse(localStorage.getItem('todolist')) || [];
            saveList.push(text);
            localStorage.setItem('todolist', JSON.stringify(saveList));
        }

        // 버튼 클릭시 함수 실행
        btn.addEventListener('click', function () {
            // input 태그에 값을 공백을 제거하고 가져와서 value 변수에 담는다.
            const value = input.value.trim();
            // value 값이 빈값이 아니면 if문 실행
            if (value !== '') {
                // addItem 함수 호출 value 값을 함수로 전달한다.
                addItem(value);
                storageSave(value);

                // input 값 초기화
                input.value = '';
            }
        });

        window.addEventListener('DOMContentLoaded', function () {
            const saveList = JSON.parse(this.localStorage.getItem('todolist')) || [];
            saveList.forEach((e) => {
                addItem(e);
            });
        });
    })();
