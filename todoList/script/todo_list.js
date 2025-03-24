/**
 * 1. 화면 구성
 * 2. 리스트 출력할 위치 동적으로 생성
 * 3. enter 키를 통해 추가 가능 (문제: 한글로 입력하게되면 두개씩 생성 해당 내용 예외처리)
 * 4. 더블 클릭 시 삭제 가능하게 처리
 * 5. localStroage 에 데이터 저장 새로고침해도 기존 내용 출력 처리
 */
const todoInput = document.querySelector('#fe-new-todo'); // input 태그
const addBtn = document.querySelector('#fe-add-btn'); // "+" todo List 추가 버튼
const todoList = document.querySelector('#fe-todo-list'); // todo List 추가될 위치
const allDeleteList = document.querySelector('#fe-all-delete');
let isComposing = false; // 한글 입력여부 예외 처리를 위한 변수

// todo List 에 작성된 데이터 (localStorage 에 저장된 데이터 담는 그릇)
const storageTodoList = JSON.parse(localStorage.getItem('save-items'));

// localStorage에 있는 데이터 길이만큼 생성
if(storageTodoList) {
    for (let i = 0; i < storageTodoList.length; i++) {
        createTodoList(storageTodoList[i]); // storage에 저장되어 있는 데이터 넘겨준다.
    }
}

// 한글 입력 시작 → IME 상태 on
// 'compositionstart' 한글 입력 시작 → 조합 중 감지 event
document.addEventListener('compositionstart', function() {
    isComposing = true;
});

// 한글 입력 끝남 → IME 상태 off
// 'compositionend' 한글 입력 종료 → 조합 끝남 감지 event
document.addEventListener('compositionend', function() {
    isComposing = false;
});

// "+" click list 추가
addBtn.addEventListener('click', () => {
    // input 태그의 값이 빈값이 아닌 경우 추가
    if (todoInput.value !== ''){
        createTodoList()
    }
});

// 함수 실행을 할 때는 allDeleteTodoList() 이렇게 사용된다. 
// 이렇게 사용하게되면 페이지 진입시 함수를 호출하게되는 문제가 발생
// allDeleteTodoList 이렇게 사용하게 되면 함수 전달로 처리되기 때문에
// 이벤트가 발생하는 시점에 함수가 실행된다.
allDeleteList.addEventListener('click', allDeleteTodoList);

// 전체 삭제
function allDeleteTodoList () {
    // li 태그에 있는 모든 요소 선택
    const liList = document.querySelectorAll('#fe-todo-list li');

    // 반복문을 통해서 li 태그 모든 값을 제거
    for (let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
    
    // storage 에 값에 제거 된 내용을 함수로 전달
    storageSaveItme();
}

// Enter key TO-do list 추가
// window 객체안에 event.KeyboardEvent 객체에 Enter 키로 추가 event
function keydown (event) {
    if (isComposing) {return;} // 한글 입력 중일떄 return (중복 이벤트 방지)

    // KeyboardEvent내 code 값이 Enter이거나 input 태그가 빈값이 빈값이 아니면 생성 함수 실행
    if(event.code=== 'Enter' && todoInput.value !== ''){
        createTodoList();
    }
}

// localStorage 에 데이터 저장
function storageSaveItme () {
    const saveItems = []; // localStorage 에 있는 데이터 담을 배열

    for (let i = 0; i < todoList.children.length; i++) {
        // 길이만큼 데이터를 객체로 받아서 저장
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
    const li = document.createElement('li'); // 추가되는 list 에 li tag 생성
    const btn = document.createElement('button'); // list 완료처리를 위한 버튼 생성
    const span = document.createElement('span'); // list 에 작성되는 문구 저장 tag 생성

    let todoListContents = todoInput.value; // 작성하는 input TAG에 값을 담는다.
    if (data) { // localStorage에 데이터 있으면 담는다.
        todoListContents = data.contents;
    }

    li.appendChild(btn); // li 태그 자식 요소로 btn 버튼 tag를 추가
    li.appendChild(span); // li 태그 자식 요소로 span 태크 추가

    span.textContent = todoListContents; // span 태크에 내용으로 값을 넣어준다.

    todoList.appendChild(li); // html 에 만들어 놓은 ul(class명으로 fe-todo-list) 태그 자식 요소로 li 태그 추가

    todoInput.value = '' // 작성 완료한(추가완료) input 태그 내용을 초기화

    // 버튼 태그를 클릭했을때 li tag에 클래스명 'complete' 추가하고 
    // storage 관련 함수 실행 event
    btn.addEventListener('click', () => {
        li.classList.toggle('complete');
        storageSaveItme();
    });

    // list dblclick delete (list 에 만들어 놓은 데이터 더블 클릭시 제거 기능) event
    li.addEventListener('dblclick', () => {
        li.remove();
        storageSaveItme();
    });
    
    // class add
    // storage 에서 받아 온 데이터의 값이 있고, 
    // storage 함수 내에 data 객체에 complete 값이 있으면
    // // li 태그에 class 명 'complete' 를 추가한다.
    // if (data && data.complete === true) {
    //     li.classList.add('complete');
    // }
    li.className = data?.complete ? 'complete' : '';
    
    // storage 함수 호출 
    storageSaveItme();
}