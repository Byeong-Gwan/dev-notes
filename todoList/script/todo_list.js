
const addBtn = document.querySelector('#fe-add-btn');
const todoInput = document.querySelector('#fe-new-todo');
const todoList = document.querySelector('#fe-todo-list');
let isComposing = false;

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
        createTodoList()
    }
})

// 전체 삭제
function allDeleteTodoList () {
    const liList = document.querySelectorAll('#fe-todo-list li')
    for (let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
}

// Enter key TO-do list 추가
function keydown (event) {
    const key = window.event;
    console.log(key);
    if (isComposing) {return;}
    if(key.code=== 'Enter' && todoInput.value !== ''){
        createTodoList();
    }
}


// New To-do list create
function createTodoList () {

    const li = document.createElement('li');
    const btn = document.createElement('button');
    const span = document.createElement('span');

    li.appendChild(btn);
    li.appendChild(span);

    span.textContent = todoInput.value;

    todoList.appendChild(li);
    console.log(li);

    todoInput.value = ''

    btn.addEventListener('click', () => {
        li.classList.toggle('complete');
    })

    li.addEventListener('dblclick', () => {
        li.remove();
    })
}