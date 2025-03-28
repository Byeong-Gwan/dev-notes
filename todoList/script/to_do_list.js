/**
 * 2번째 todo_list 
 * 
 * 1. 화면 구성
 * 2. 리스트 출력할 위치 동적으로 생성
 * 3. enter 키를 통해 추가 가능 (문제: 한글로 입력하게되면 두개씩 생성 해당 내용 예외처리)
 * 4. 더블 클릭 시 삭제 가능하게 처리
 * 5. localStroage 에 데이터 저장 새로고침해도 기존 내용 출력 처리
 * 6. 다크, 라이트 기능 추가
 * 
 * 추가 예정 
 * 1. 기안 설정하기
 * 2. 해당 기안 일 3일전부터 해당 부분 빨간색으로 글자 변경
 */

const inputAdd = document.querySelector('.fe-new-todo'); // input tag
const todoListUl = document.querySelector('.fe-todo-list'); // ul tag
let isComposing = false;

// storage 데이터 저장
const storageItem = JSON.parse(localStorage.getItem('save-items')); 

const change = document.querySelector("#change");

// 다크&라이트 모드 전환을 위해 body 전체를 가져옴
const body = document.querySelector("body");


// night&day 전환 조건
function changeHandle () {
    if(change.value === "night") {
        body.classList.add("night");
        body.classList.remove("day");
        change.value = "day";
    } else {
        body.classList.remove("night");
        body.classList.add("day");
        change.value = "night";
    }
}

// localStorage에 데이터 여부 확인 있으면 생성 함수 실행
// 없으면 넘어감
if (storageItem) {
    for (let i = 0; i < storageItem.length; i++) {
        createTodoList(storageItem[i]);
    }
}

// 매개변수 필요없는 event
function bindEvent() {
    document.querySelector('.fe-add-btn').addEventListener('click', 
        function() {
        if (inputAdd.value !== '') {
            createTodoList();
        }
    });

    // 전체 삭제 event
    document.querySelector('.fe-all-delete-btn').addEventListener('click', 
        allDeleteTodoList);

    // 한글 입력 시작
    document.addEventListener('compositionstart', function() {
        isComposing = true;
    });

    // 한글 입력 종료
    document.addEventListener('compositionend', function() {
        isComposing = false;
    })
    
    // Enter key event
    inputAdd.addEventListener('keydown', function(event) {
        if (isComposing) {return;}
        
        if (event.code === 'Enter' && inputAdd.value !== '') {
            createTodoList();
        }
    });

    // 화면 정환 event (다크/라이트)
    change.addEventListener("click", changeHandle);
    storageSaveItem();
}

// 매개변수가 필요한 event 처리
function bindLiEvent(li, span, btn, deleteBtn, dateInfo){
    // 더블 클릭(li tag)에 있는 데이터 수정 함수 실행
    span.addEventListener('dblclick', function () {
        dblClickEvent(span);
    });

    dateInfo.addEventListener('dblclick', function () {
        dblClickEvent(dateInfo);
    });

    btn.addEventListener('click', () => {
        li.classList.toggle('complete');
        storageSaveItem();
    });

    // 'X' 버튼 클릭 시 개별 삭제 기능
    deleteBtn.addEventListener('click', function() {
        todoListUl.removeChild(li);
        storageSaveItem();
    });


    
}

// storage에 데이터 저장
function storageSaveItem () {
    const saveItems = [];

    for (let i = 0; i < todoListUl.children.length; i++) {
        const span = todoListUl.children[i].querySelector('span');
        const dateElem = todoListUl.children[i].querySelector('.fe-due-date');
        let dueDate = '';

        if (dateElem) {
            dueDate = dateElem.textContent.replace('', '');  // 날짜만 추출
        }

        // 저장용 객체
        const objList = {
            contents: span.textContent,
            dueDate: dueDate,
            complete: todoListUl.children[i].classList.contains('complete')
        };

        saveItems.push(objList);
    }

    if (saveItems.length === 0) {
        localStorage.removeItem('save-items');
    } else {
        localStorage.setItem('save-items', JSON.stringify(saveItems));
    }
}

// 더블 클릭 시 수정 Prompt open 수정 완료 시 storage에 데이터 저장 
function dblClickEvent (spanElement) {
    const currentText = spanElement.textContent;

    const newText = prompt('내용을 수정하세요.', currentText);

    if (newText !== null && newText.trim() !== '') {
        spanElement.textContent = newText.trim();
    }
    location.reload();
    storageSaveItem();
    
}

// 전체 삭제 기능
function allDeleteTodoList () {
    const list = document.querySelectorAll('.fe-todo-list li');
    for (let i = 0; i < list.length; i++) {
        list[i].remove();
    }
    storageSaveItem();
}

function removeList(li, diffDays) {
    if (diffDays === 0) {
        li.remove();
    }
}

function checkDate(li) {
    const dueDate = li.getAttribute('data-due-date');
    if (!dueDate) return;

    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}


// 
function checkDeadline(li) {
    diffDays = checkDate(li);
    console.log('diffDays::', diffDays);

    if (diffDays <= 3) {
        li.querySelector('span').style.color = 'red';
    } else {
        li.querySelector('span').style.color = '';
    }

    if (diffDays === 0) {
        li.className = 'complete';
        alert('todo list 중 기안이 만료된 list가 있습니다. 기안이 만료되어 "완료"처리 되었습니다.');
    }
    storageSaveItem();
}

// todo list 데이터 추가 
function createTodoList (storageItem) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    const dateInfo = document.createElement('small');
    

    let todoContents = inputAdd.value;

    let dueDate;

    if (storageItem) {
        todoContents = storageItem.contents;
        dueDate = storageItem.dueDate;  // 저장된 기안일 불러오기
    } else {
        dueDate = prompt("기안일을 입력하세요. (예: 2025-03-31)", "");  // 직접 입력받기
        dueDate = dueDate.split('.');
        console.log('dueDate', dueDate)
        while (true) {
            const now = new Date();
            const due = new Date(dueDate);
            let diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        
            if (diffDays >= 0) break;  // ✅ diffDays가 0 이상이면 루프 종료
        
            dueDate = prompt("날짜가 지났습니다. 다시 입력해주세요. (예: 2025-03-31)", "");  // ❗ 새로운 날짜 입력받기
            if (!dueDate) break;  // 사용자가 취소하면 루프 종료
        }
    }
    
    
    li.appendChild(btn);
    li.appendChild(span);
    li.appendChild(dateInfo);
    li.appendChild(deleteBtn);

    if (dueDate) {
        dateInfo.textContent = `${dueDate}`;
        dateInfo.className = 'fe-due-date';
        li.setAttribute('data-due-date', dueDate);
    }


    span.textContent = todoContents;
    deleteBtn.textContent = 'X';

    deleteBtn.className = 'fe-list-delete';
    btn.className = 'fe-checked';

    
    todoListUl.appendChild(li);

    inputAdd.value = '';

    // 매개변수 필요한 event 호출 
    bindLiEvent(li, span, btn, deleteBtn, dateInfo);

    li.className = storageItem?.complete ? 'complete' : '';
    

    // 기한 확인 및 색상 표시
    checkDeadline(li);

    storageSaveItem();
}
bindEvent();
