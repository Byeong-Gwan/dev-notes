/**
 * 1. 화면 구성
 * 2. 리스트 출력할 위치 동적으로 생성
 * 3. enter 키를 통해 추가 가능 (문제: 한글로 입력하게되면 두개씩 생성 해당 내용 예외처리)
 * 4. 더블 클릭 시 삭제 가능하게 처리
 * 5. localStroage 에 데이터 저장 새로고침해도 기존 내용 출력 처리
 */
const addBtn = document.querySelector('#fe-add-btn');
const todoInput = document.querySelector('#fe-new-todo');
const todoList = document.querySelector('#fe-todo-list');
let isComposing = false;

// Todo list item create
const storageTodoList = JSON.parse(localStorage.getItem('save-items'));

if(storageTodoList) {

    for (let i = 0; i < storageTodoList.length; i++) {
        createTodoList(storageTodoList[i]);
    }
}
// 한글 입력 시작 → IME 상태 on
document.addEventListener('compositionstart', function() {
    isComposing = true;
});
// 한글 입력 끝남 → IME 상태 off
document.addEventListener('compositionend', function() {
    isComposing = false;
});
// "+" click list 추가
addBtn.addEventListener('click', () => {
    if (todoInput.value !== ''){
        createTodoList();
    }
});

// 전체 삭제
function allDeleteTodoList () {
    const liList = document.querySelectorAll('#fe-todo-list li');

    for (let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
    storageSaveItme();
}

// Enter key TO-do list 추가
function keydown (event) {
    const key = window.event;

    if (isComposing) {return;}

    if(key.code=== 'Enter' && todoInput.value !== ''){
        createTodoList();
    }
}

// localStorage 에 데이터 저장
function storageSaveItme () {
    const saveItems = [];

    for (let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent, // 리스트 목록
            complete: todoList.children[i].classList.contains('complete') // 완료 표시된 리스트
        };
        saveItems.push(todoObj); // 배열 추가
    }

    if (saveItems.length === 0) {
        localStorage.removeItem('save-items')
    } else {
        localStorage.setItem('save-items', JSON.stringify(saveItems));
    }
}
// New To-do list create
function createTodoList (data) {
    let todoListContents = todoInput.value;

    if (data) {
        todoListContents = data.contents;
    }

    const li = document.createElement('li');
    const btn = document.createElement('button');
    const span = document.createElement('span');

    li.appendChild(btn);
    li.appendChild(span);

    span.textContent = todoListContents;

    todoList.appendChild(li);
    todoInput.value = '';

    btn.addEventListener('click', () => {
        li.classList.toggle('complete');
        storageSaveItme();
    });

    li.addEventListener('dblclick', () => {
        li.remove();
        storageSaveItme();
    });
    if (data && data.complete === true) {
        li.classList.add('complete');
    }
    storageSaveItme();
}